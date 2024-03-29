import { combineReducers } from "redux";
import registeredUserDetails from "./registeredUserDetails";
import chatManagement from "./chatManagement";
import loginDetails from "./loginDetails";
import uuid from "./uuid";
const rootReducer = combineReducers({
  registeredUserDetails: registeredUserDetails,
  chatManagement,
  loginDetails,
  uuid,
  // if there are other reducers , we can add here one by one
});
export default rootReducer;
