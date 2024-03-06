// require("./database-connection/database-connectivity.js");
// import {BodyParser} from "body-parser";
const body = require("body-parser");
const express = require("express");
const app = express();
const PORT = 4000;

app.use(body.json());

const http = require("http").Server(app);
const cors = require("cors");
const databaseFunctions = require("./database-connection/database-connectivity.js");

app.use(cors());

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
    console.log("chattt", data);
    // socketIO.emit("chat", { ...data, req: "For Everyone" });
    socket.broadcast.emit("chat", { ...data, otherUser: true });
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

app.get("/api/get-all-uuid" , async (req , res) => {
  databaseFunctions.getUuid(res);
})



app.post("/api/existing-chat", async (req, res) => {
  databaseFunctions.getChatFromUuid(req.body , res);
  
});

app.post("/api/sign-up", async (req, res) => {
  databaseFunctions.addUserDetails(req.body);
  const data = { message: "Data Saved Successfully!!" };
  res.json(data);
});
app.post("/api/login", async (req, res) => {
  databaseFunctions.addUserDetails(req.body);
  const data = { message: "Data Saved Successfully!!" };
  res.json(data);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// console.log(databaseFunctions.add());
