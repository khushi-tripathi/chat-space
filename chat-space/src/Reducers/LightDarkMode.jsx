import {
    SET_APP_MODE,
    SET_DEFAULT_VALUE,
} from "../Actions/actionConstant";
import { DARK } from "../Constants/constant";
const initialState = {
    mode: DARK
};
function LightDarkMode(state = initialState, action) {
    switch (action?.type) {
        case SET_APP_MODE:
            return {
                ...state,
                mode: action.payload.mode
            };
        case SET_DEFAULT_VALUE:
            return initialState
        default:
            return state;
    }
}
export default LightDarkMode;
