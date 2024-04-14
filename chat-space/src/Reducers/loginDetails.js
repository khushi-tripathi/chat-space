import {
  SET_LOGIN_CREDENTIALS,
  SET_BY_DEFAULT_LOGIN_DETAILS,
  SET_DEFAULT_VALUE,
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
    case SET_DEFAULT_VALUE:
      return initialState
    default:
      return state;
  }
}

export default loginDetails;
