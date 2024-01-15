import { io } from "socket.io-client";

var socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

socket.on("chat", (data) => {
  console.log(data);
});

// export const disconnectSocket = () => {
//   socket.disconnect();
// };

export const socketEmit = (event, data) => {
  const req = {
    ...data,
  };
  socket.emit(event, req);
};
