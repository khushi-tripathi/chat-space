import { combineReducers } from "redux";
import registeredUserDetails from "./registeredUserDetails";
import chatManagement from "./chatManagement";
import loginDetails from "./loginDetails";
import uuid from "./uuid";
import groupDetails from "./groupDetails";
import LightDarkMode from "./LightDarkMode"

const rootReducer = combineReducers({
  registeredUserDetails: registeredUserDetails,
  chatManagement,
  loginDetails,
  uuid,
  groupDetails,
  LightDarkMode
  // if there are other reducers , we can add here one by one
});
export default rootReducer;
