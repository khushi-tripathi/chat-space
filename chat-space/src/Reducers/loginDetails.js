import {
  SET_LOGIN_CREDENTIALS,
  SET_BY_DEFAULT_LOGIN_DETAILS,
} from "../Actions/actionConstant";

const initialState = {
  credentials: {
    email: "",
    password: "",
  },
};
function loginDetails(state = initialState, action) {
  switch (action?.type) {
    case SET_BY_DEFAULT_LOGIN_DETAILS:
      return { ...state, userDetails: [] };
    case SET_LOGIN_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
    default:
      return state;
  }
}
export default loginDetails;
