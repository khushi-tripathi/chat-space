import {
    SET_CHAT_MESSAGES,
    ADD_NEW_CHAT,
    REMOVE_CHAT,
    REMOVE_CHAT_MESSAGES,
  } from "../Actions/actionConstant";
  const initialState = {
    chatArray: {
      own: [
        {
          message: "Hi, This is your space you can do anything here!!",
          type: "own",
        },
      ],
    },
  };
  function uuid(state = initialState, action) {
    switch (action?.type) {
      case ADD_NEW_CHAT:
        //payload.newChat [] hoga
        return {
          ...state,
          chatArray: {
            ...state?.chatArray,
            [action.payload.idx]: { ...action.payload.newChat },
          },
        };
      case SET_CHAT_MESSAGES:
        return {
          ...state,
          chatArray: {
            ...state?.chatArray,
            [action.payload.idx]: {
              ...state?.chatArray?.[action.payload.idx],
              ...action?.payload?.message,
            },
          },
        };
      case REMOVE_CHAT:
        return {
          ...state,
          userDetails: action?.payload?.userDetails,
        };
      default:
        return state;
    }
  }
  export default uuid;
  