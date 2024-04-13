import axios from "axios";
import { FETCH_USER_DETAILS, SET_TAB_DATA } from "./actionConstant";
import { GET_USER_DETAILS, SUBMIT_ADMIN_DATA } from "../Constants/urls";

const registeredUserDetails = () => {
  // status = false, allUserTab, loginData, groupData
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
        // if (status) {
        //   debugger
        //   const ownTab = allUserTab?.filter((item) => item?.email === loginData?.credentials?.email)
        //   const otherTab = allUserTab?.filter((item) => item?.email !== loginData?.credentials?.email)
        //   // setTabData([...ownTab, ...otherTab, ...groupData])
        //   dispatch({
        //     type: SET_TAB_DATA,
        //     payload: {
        //       tabData: [...ownTab, ...otherTab, ...groupData]
        //     },
        //   });

        // }



      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const submitAdminData = (tables) => {
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

