import {
  FETCH_UUID_DATA,
  SET_DEFAULT_VALUE,
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
    case SET_DEFAULT_VALUE:
      return initialState

    default:
      return state;
  }
}
export default uuid;
