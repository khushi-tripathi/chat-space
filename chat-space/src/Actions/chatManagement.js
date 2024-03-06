import axios from "axios";
import {  FETCH_UUID_DATA } from "./actionConstant";

const getUuid = (loginData) => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/get-all-uuid")
      .then((response) => {
        const data  =  response.data.data.filter((item) => { return item?.primary_user === loginData?.credentials?.email || item?.other_end_name === loginData?.credentials?.email})
        dispatch({
          type: FETCH_UUID_DATA,
          payload: data ,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default getUuid;
