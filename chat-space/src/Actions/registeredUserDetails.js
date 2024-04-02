import axios from "axios";
import { FETCH_USER_DETAILS } from "./actionConstant";
import { GET_USER_DETAILS } from "../Constants/urls";

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

export default registeredUserDetails;
