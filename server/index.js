const body = require("body-parser");
const express = require("express");
const multer = require("multer")
const path = require("path")
const app = express();
const databaseFunctions = require("./database-connection/database-connectivity.js");
const http = require("http").Server(app);
const cors = require("cors");
const { cloudinary, uploadOnCloudinary } = require("./utils/cloudinary.js");
const fs = require("fs");
// const cloudinary = require("./utils/cloudinary");
app.use(body.json({ limit: '50mb' }));

app.use(cors());

// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/images', express.static('images'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
})
const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.CORE_ORIGIN,
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log("Socket Connected");
  socket.on("chat", (data) => {
    socket.broadcast.emit("chat", { ...data });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("/api/fetch-user-details", async (req, res) => {
  databaseFunctions.fetchUserDetails(res);
});

app.get("/api/get-all-uuid", async (req, res) => {
  databaseFunctions.getUuid(res);
})

app.get("/api/get-group-info", async (req, res) => {
  databaseFunctions.getGroupInfo(res);
})

app.post("/api/existing-chat", async (req, res) => {
  databaseFunctions.getChatFromUuid(req.body, res);
});

app.post("/api/submit-admin-data", async (req, res) => {
  databaseFunctions.submitAdminInfo(req.body, res);
});

app.post("/api/add-uuid", async (req, res) => {
  databaseFunctions.addUuid(req.body, res);
});

app.post("/api/add-new-chat", async (req, res) => {
  databaseFunctions.addNewChat(req.body, res);
});

app.post("/api/add-new-group", async (req, res) => {
  databaseFunctions.addNewGroup(req.body, res);
});

app.post("/api/update-chat", async (req, res) => {
  databaseFunctions.updateChat(req.body, res);
});

app.post("/api/update-group-info", async (req, res) => {
  databaseFunctions.updateGroupInfo(req.body, res);
});

app.post("/api/sign-up", upload.single("image"), async (req, res) => {
  const imageLocalPath = req.file?.path;
  console.log(req.file)
  if (!imageLocalPath) {
    throw new Error(400, "image file is required")
  } else {
    const url = await uploadOnCloudinary(imageLocalPath)
    if (url === undefined) {
      res.json({ error: true });
    } else {

      let request = JSON.parse(req.body?.userData)
      request = {
        ...request,
        profile: url
      }
      databaseFunctions.addUserDetails(request);
      const data = { message: "Data Saved Successfully!!" };
      res.json(data);
    }
    console.log("URLLL : ", url)

  }

  // console.log("uploaded : ", response)

  //   // const image =
  //   //     await cloudinary?.uploadOnCloudinary(imageLocalPath)

  //     let request = JSON.parse(req.body?.userData)
  //     request = {
  //       ...request,
  //       profile: image?.url
  //     }
  // res.json(data);

});

// app.post("/api/sign-up", upload?.single("image"), async (req, res) => {
//   const imageLocalPath = req.file?.path;
//   console.log("file", req.file)
//   console.log("imageLocalPath", imageLocalPath)

//   if (!imageLocalPath) {
//     throw new Error(400, "image file is required")
//   }

//   // if (!imageLocalPath) return null

//   let image;

//   // setTimeout(async () => {
//     image =
//       await cloudinary?.uploadOnCloudinary(imageLocalPath)

//     let request = JSON.parse(req.body?.userData)
//     request = {
//       ...request,
//       profile: image?.url
//     }
//     // databaseFunctions.addUserDetails(request);
//     const data = { message: "Data Saved Successfully!!" };
//     res.json(data);
//   // }, 500);

// });

http.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});