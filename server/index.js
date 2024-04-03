const body = require("body-parser");
const express = require("express");
const multer = require("multer")
const path = require("path")
const app = express();
const databaseFunctions = require("./database-connection/database-connectivity.js");
const http = require("http").Server(app);
const cors = require("cors");
app.use(body.json({ limit: '50mb' }));

app.use(cors());

// Function to serve all static files
// inside public directory.
// app.use(express.static('public'));
// app.use('/images', express.static('images'));

// const storage = multer.diskStorage({
//   destination : (req , file ,cb) =>{
//     cb(null, 'public/images')
//   },
//   filename : (req , file , cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage :storage,
// })
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log("Socket Connected");

  // socket.emit("chat", { ...data, req: "global" });
  socket.on("chat", (data) => {
    console.log("socket chat emit", data);
    // socketIO.emit("chat", { ...data, req: "For Everyone" });
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
  console.log("ktripathi : ")
  databaseFunctions.submitAdminInfo(req.body, res);
});


// "submit-admin-data"

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






app.post("/api/sign-up", async (req, res) => {
  console.log("body", req.body)
  // console.log("file" , req.file) 
  // let request = JSON.parse(req.body)
  // request = {
  //   ...request , 
  //   profile : req.file?.filename
  // }
  databaseFunctions.addUserDetails(req.body);
  const data = { message: "Data Saved Successfully!!" };
  res.json(data);
});
// app.post("/api/login", async (req, res) => {
//   databaseFunctions.addUserDetails(req.body);
//   const data = { message: "Data Saved Successfully!!" };
//   res.json(data);
// });

http.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

// console.log(databaseFunctions.add());
