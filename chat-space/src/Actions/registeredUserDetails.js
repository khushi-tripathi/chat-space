import axios from "axios";
import { FETCH_USER_DETAILS } from "./actionConstant";

export const registeredUserDetails = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/fetch-user-details")
      .then((response) => {
        console.log("Khushi", response);
        debugger;
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
