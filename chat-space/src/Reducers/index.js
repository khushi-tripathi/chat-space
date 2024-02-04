import { combineReducers } from "redux";
import registeredUserDetails from "./registeredUserDetails";
// other reducers needs to import here
const rootReducer = combineReducers({
  registeredUserDetails: registeredUserDetails,
  // if there are other reducers , we can add here one by one
});
export default rootReducer;
