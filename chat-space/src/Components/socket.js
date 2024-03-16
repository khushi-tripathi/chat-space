import { io } from "socket.io-client";
import store from '../store';
import { ADD_NEW_CHAT, SET_CHAT_MESSAGES } from "../Actions/actionConstant";

var socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

socket.on("chat", (data) => {

  console.log(store?.getState()?.uuid?.uuidData)
  console.log(store?.getState()?.loginDetails?.credentials?.email)
  debugger
  const isValidUuid = store?.getState()?.uuid?.uuidData?.filter((item) => item?.uuid === data?.uuid)

  if (isValidUuid?.length) {
    store?.dispatch({
      type: SET_CHAT_MESSAGES,
      payload: {
        idx: data?.uuid,
        message: data?.chat
      }
    });
  } else if (data?.otherUser === store?.getState()?.loginDetails?.credentials?.email) {
    store?.dispatch({
      type: ADD_NEW_CHAT,
      payload: {
        uuid: data?.uuid,
        chat: [data?.chat],
      }
    });
  }


  console.log(data);

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
