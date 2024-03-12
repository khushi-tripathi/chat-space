import axios from "axios";
import { ADD_EXISTING_CHAT, FETCH_UUID_DATA } from "./actionConstant";

const getUuid = (loginData) => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/get-all-uuid")
      .then((response) => {
        const data = response.data.data.filter((item) => { return item?.primary_user === loginData?.credentials?.email || item?.other_user === loginData?.credentials?.email })
        dispatch({
          type: FETCH_UUID_DATA,
          payload: data,
        });

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
        // },   // is format ka data tiaar krro 

        // data key se uuid ya response se uuid ke saath chat leti jaao 

        // array me krke story krvado 
        // usse pehle ab ek insert krke dekhlo
        // dono widow pr display krvaake msg 
        // fir yha se vaps continue krenge







        // response?.data?.data === data[]
        // idx :  [ { id: 1, uuid: '12', primary_user: 'KT@', chat: '"hi"' } ]
        debugger

        // dispatch({
        //   type: ADD_EXISTING_CHAT,
        //   payload: response?.data?.data?.[0]?.chat ,
        // });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const updateDatabase = (data, uuid, primary_user) => {
  return function (dispatch) {

    debugger
    axios
      .post("http://localhost:4000/api/update-chat", {
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

export {
  getUuid,
  updateDatabase
}

