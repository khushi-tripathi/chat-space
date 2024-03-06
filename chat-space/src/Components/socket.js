import { io } from "socket.io-client";
import store from '../store';
import { SET_CHAT_MESSAGES } from "../Actions/actionConstant";

var socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

socket.on("chat", (data) => {
  if(data?.otherUser){
    store?.dispatch({
      type: SET_CHAT_MESSAGES,
      payload: {
        userDetails: data.data,
      },
    });
    console.log(data);
  }
});

socket.on("hello", (data) => {
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
