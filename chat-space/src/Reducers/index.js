import { combineReducers } from "redux";
import registeredUserDetails from "./registeredUserDetails";
import chatManagement from "./chatManagement";
import loginDetails from "./loginDetails";
import uuid from "./uuid";
import groupDetails from "./groupDetails";
import LightDarkMode from "./LightDarkMode"
import userTab from "./userTab"

const rootReducer = combineReducers({
  registeredUserDetails: registeredUserDetails,
  chatManagement,
  loginDetails,
  uuid,
  groupDetails,
  LightDarkMode,
  userTab,
});
export default rootReducer;
