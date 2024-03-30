import {
  SET_CHAT_MESSAGES,
  ADD_NEW_CHAT,
  REMOVE_CHAT,
  ADD_EXISTING_CHAT,
  SET_DEFAULT_VALUE,
} from "../Actions/actionConstant";
const initialState = {
  chatArray: {
    // own: [
    //   {
    //     message: "Hi, This is your space you can do anything here!!",
    //     type: "own",
    //   },
    // ],
  },
};
function chatManagement(state = initialState, action) {
  switch (action?.type) {

    case ADD_EXISTING_CHAT:
      return {
        ...state,
        chatArray: {
          ...state?.chatArray,
          ...action?.payload,
        },
      };

    case ADD_NEW_CHAT:
      const data = {
        ...state,
        chatArray: {
          ...state?.chatArray,
          [action?.payload?.uuid]: action.payload?.chat,
        },
      }
      return data;
    case SET_CHAT_MESSAGES:
      return {
        ...state,
        chatArray: {
          ...state?.chatArray,
          [action.payload.idx]: [
            ...state?.chatArray?.[action.payload.idx],
            action?.payload?.message,
          ],
        },
      };
    case REMOVE_CHAT:
      return {
        ...state,
        userDetails: action?.payload?.userDetails,
      };
    case SET_DEFAULT_VALUE:
      return initialState
    default:
      return state;
  }
}
export default chatManagement;
