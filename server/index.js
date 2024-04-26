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
app.use(body.json({ limit: '50mb' }));

//jha sign upp ke baad photos dikharhe h vha direct url daalna h photo ka 
//group create krte time bhi same cheez keni h 
//group edit ke time bhi same cheez krnge 
//delete krna seekhenge cloudinary me 
// jb table se data htega tb delete hogi and jb edit krenge tb bhi delete krke new vaali  lenge agr update hui hoto 

// then overall check krna h flow backend and frontnend ka 
// then deploy properly 

// today chat-space should be completed with correct deployment 

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

const fetchImageUrl = async (imageLocalPath, res) => {
  if (!imageLocalPath) {
    throw new Error(400, "image file is required")
  } else {
    try {
      console.log("ELsee")
      const imgData = await uploadOnCloudinary(imageLocalPath)
      if (imgData === undefined) {
        res.json({ error: true });
      } else {
        console.log("return")
        return imgData
      }
    } catch (error) {
      console.log("Catch : ", error)
      res.json({ error: true, serverError: error });
    }

  }
}

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

app.post("/api/add-new-group", upload.single("image"), async (req, res) => {
  const img = await fetchImageUrl(req.file?.path, res)
  if (img?.url?.length) {
    let request = JSON.parse(req.body?.userData)
    request = {
      ...request,
      group_picture: img?.url,
      image_public_id: img?.public_id
    }
    console.log("Request ::: ", request)
    databaseFunctions.addNewGroup(request, res);
  }
});

app.post("/api/update-chat", async (req, res) => {
  databaseFunctions.updateChat(req.body, res);
});

app.post("/api/update-group-info", upload.single("image"), async (req, res) => {

  const img = await fetchImageUrl(req.file?.path, res)
  if (img?.url?.length) {
    let request = JSON.parse(req.body?.userData)
    request = {
      ...request,
      group_picture: img?.url,
      image_public_id: img?.public_id
    }
    console.log("Request ::: ", request)
    databaseFunctions.updateGroupInfo(request, res);
  }
});

app.post("/api/sign-up", upload.single("image"), async (req, res) => {
  const img = await fetchImageUrl(req.file?.path, res)
  if (img?.url?.length) {
    let request = JSON.parse(req.body?.userData)
    console.log("Request below")
    request = {
      ...request,
      profile: img?.url,
      image_public_id: img?.public_id
    }
    console.log("Above below")

    databaseFunctions.addUserDetails(request);
    const data = { message: "Data Saved Successfully!!", image: img?.url };
    console.log("LAST")
    res.json(data);
  }
});

http.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});