import axios from "axios";
import { FETCH_USER_DETAILS } from "./actionConstant";
import { GET_USER_DETAILS, SUBMIT_ADMIN_DATA } from "../Constants/urls";

const registeredUserDetails = () => {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_API_URL + GET_USER_DETAILS)
      .then((response) => {
        dispatch({
          type: FETCH_USER_DETAILS,
          payload: {
            userDetails: response.data.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const submitAdminData = (tables) => {
  debugger
  return function (dispatch) {
    axios
      .post(process.env.REACT_APP_API_URL + SUBMIT_ADMIN_DATA, {
        tables
      })
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  };
};




export {
  registeredUserDetails,
  submitAdminData
}

