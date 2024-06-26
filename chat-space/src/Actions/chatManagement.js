import axios from "axios";
import { ADD_EXISTING_CHAT, FETCH_GROUP_INFO, FETCH_UUID_DATA } from "./actionConstant";
import { ADD_NEW_GROUP, EXISTING_CHAT, GET_ALL_UUID, GET_GROUP_INFO, UPDATE_CHAT, UPDATE_GROUP_INFO, ADD_NEW_CHAT } from "../Constants/urls";

const getUuid = (loginData, checkExistingChat, groupData) => {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_API_URL + GET_ALL_UUID)
      .then((response) => {
        const data = response.data.data.filter((item) => {
          return item?.primary_user === loginData?.credentials?.email || item?.other_user === loginData?.credentials?.email
        })
        dispatch({
          type: FETCH_UUID_DATA,
          payload: data,
        });
        if (checkExistingChat) {
          if (data?.length) {
            dispatch(fetchExistingChat(data, 'getUuid'))
          }
          dispatch(fetchGroupInfo(loginData?.credentials, groupData))
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const fetchGroupInfo = (loginData, existingGroupData) => {
  return function (dispatch) {
    axios
      .get(process.env.REACT_APP_API_URL + GET_GROUP_INFO)
      .then((response) => {

        const data = response?.data?.data?.filter((item, i) => {
          const member = JSON.parse(item?.group_member || '[]')
          if (member?.includes(loginData?.email)) {
            return item;
          }
        })
        const groupData = data.map((item, i) => {
          const mem = JSON.parse(item?.group_member || '[]')
          const admin = JSON.parse(item?.admin || '[]')
          return { ...item, group_member: mem, admin }
        }
        )
        if (data?.length) {
          dispatch({
            type: FETCH_GROUP_INFO,
            payload: {
              groupData,
              isGroupDataUpdated: JSON.stringify(existingGroupData || {}) !== JSON.stringify(groupData || {}) ? true : false
            },
          });
          dispatch(fetchExistingChat(groupData, 'fetchGroupInfo'))
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

const fetchExistingChat = (data, functionCall = '') => {
  return function (dispatch) {
    axios
      .post(process.env.REACT_APP_API_URL + EXISTING_CHAT, data)
      .then((response) => {

        // Data format below : 

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
      .post(process.env.REACT_APP_API_URL + ADD_NEW_CHAT, {
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
      .post(process.env.REACT_APP_API_URL + UPDATE_CHAT, {
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

const addNewGroup = (uuid, primary_user, group_member, group_name, admin, group_picture, setLoading) => {
  return function (dispatch) {
    const formdata = new FormData();
    formdata.append('image', group_picture)
    formdata.append('userData', JSON.stringify({
      uuid,
      primary_user,
      group_member: group_member || [],
      admin: admin || [],
      group_name,
      // group_history : ''
    }))
    axios
      .post(process.env.REACT_APP_API_URL + ADD_NEW_GROUP, formdata)
      .then((response) => {
        if (!response.data.error) {
          setLoading(true)
        } else {
          setLoading(false)
        }

      })
      .catch((error) => {
        console.error(error);
      });
  };
}

const editGroupInfo = (uuid, group_member, group_name, admin, group_picture, setLoading) => {
  return function (dispatch) {
    const formdata = new FormData();
    formdata.append('image', group_picture)
    formdata.append('userData', JSON.stringify({
      uuid,
      group_member: group_member || [],
      admin: admin || [],
      group_name,
      group_picture
      // group_history : ''  --- will add in next version 
    }))

    axios
      .post(process.env.REACT_APP_API_URL + UPDATE_GROUP_INFO, formdata)
      .then((response) => {
        if (!response.data.error) {
          setLoading(true)
        } else {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export {
  getUuid,
  addNewChat,
  updateChatData,
  addNewGroup,
  fetchGroupInfo,
  editGroupInfo
}
