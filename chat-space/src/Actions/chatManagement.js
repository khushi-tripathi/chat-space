import axios from "axios";
import { ADD_EXISTING_CHAT, FETCH_UUID_DATA } from "./actionConstant";

const getUuid = (loginData, checkExistingChat) => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/get-all-uuid")
      .then((response) => {
        const data = response.data.data.filter((item) => { return item?.primary_user === loginData?.credentials?.email || item?.other_user === loginData?.credentials?.email })
        dispatch({
          type: FETCH_UUID_DATA,
          payload: data,
        });
        if (data?.length && checkExistingChat)
          dispatch(fetchExistingChat(data))

      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const fetchExistingChat = (data) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/api/existing-chat", data)
      .then((response) => {
        // 1. chatArray: {
        //   own: [
        //     {
        //       message: "Hi, This is your space you can do anything here!!",
        //       type: "own",
        //     },
        //   ],
        // },  


        // response?.data?.data === data[]
        // idx :  [ { id: 1, uuid: '12', primary_user: 'KT@', chat: '"hi"' } ]

        let chatArray = {}
        for (let i = 0; i < response?.data?.data?.length; i++) {
          chatArray = { ...chatArray, ...response?.data?.data?.[i]?.chat }
        }

        dispatch({
          type: ADD_EXISTING_CHAT,
          payload: chatArray,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const addNewChat = (data, uuid, primary_user) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/api/add-new-chat", {
        uuid,
        chat: data,
        primary_user,
      })
      .then((response) => {

      })
      .catch((error) => {
        console.error(error);
      });
  };
}

const updateChatData = (chat, uuid, primary_user) => {
  return function (dispatch) {
    axios
      .post("http://localhost:4000/api/update-chat", {
        uuid,
        chat,
        primary_user,
      })
      .then((response) => {

      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export {
  getUuid,
  addNewChat,
  updateChatData
}

