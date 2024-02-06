import {
  FETCH_USER_DETAILS,
  SET_BY_DEFAULT_USER_DETAILS,
} from "../Actions/actionConstant";

const initialState = {
  userDetails: [],
  loading: true,
  error: false,
};
function registeredUserDetails(state = initialState, action) {
  switch (action.type) {
    case SET_BY_DEFAULT_USER_DETAILS:
      return { ...state, userDetails: [] };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action?.payload?.userDetails,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
}
export default registeredUserDetails;
