import axios from "axios";
import { FETCH_USER_DETAILS } from "./actionConstant";

const registeredUserDetails = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/fetch-user-details")
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
