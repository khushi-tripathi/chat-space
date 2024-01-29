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

  socket.on("chat", (data) => {
    console.log("chattt", data);
    socket.emit("chat", { ...data, req: "For Everyone" });
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

app.post("/api/sign-up", async (req, res) => {
  console.log(req.body);
  databaseFunctions.addUserDetails(req.body);
  const data = { message: "Data Saved Successfully!!" };
  res.json(data);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

console.log(databaseFunctions.add());
