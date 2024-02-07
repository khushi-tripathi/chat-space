import {
  FETCH_USER_DETAILS,
  SET_BY_DEFAULT_USER_DETAILS,
  SET_RADIO_BUTTON_DATA,
} from "../Actions/actionConstant";

const initialState = {
  userDetails: [],
  isDisplaySelected: true,
};
function registeredUserDetails(state = initialState, action) {
  switch (action.type) {
    case SET_BY_DEFAULT_USER_DETAILS:
      return { ...state, userDetails: [] };
    case SET_RADIO_BUTTON_DATA:
      return {
        ...state,
        isDisplaySelected: action?.payload?.isDisplaySelected,
      };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action?.payload?.userDetails,
      };
    default:
      return state;
  }
}
export default registeredUserDetails;
