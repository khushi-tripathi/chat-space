import axios from "axios";
import { FETCH_USER_DETAILS } from "./actionConstant";

const getUuid = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:4000/api/get-all-uuid")
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

export default getUuid;
