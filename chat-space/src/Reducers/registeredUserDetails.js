import {
  FETCH_USER_DETAILS,
  SET_BY_DEFAULT_USER_DETAILS,
} from "../Actions/actionConstant";

const initialState = {
  usersList: [],
  loading: true,
  error: false,
};
function registeredUserDetails(state = initialState, action) {
  switch (action.type) {
    case SET_BY_DEFAULT_USER_DETAILS:
      return { ...state, usersList: [], error: false, loading: true };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        usersList: action.payload,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
}
export default registeredUserDetails;
