import {
  SET_CHAT_MESSAGES,
  FETCH_UUID_DATA,
  REMOVE_CHAT,
  REMOVE_CHAT_MESSAGES,
} from "../Actions/actionConstant";
const initialState = {
  uuidData: [],
};
function uuid(state = initialState, action) {
  switch (action?.type) {
    case FETCH_UUID_DATA:
      return {
        ...state,
        uuidData: action?.payload,
      };


    default:
      return state;
  }
}
export default uuid;
