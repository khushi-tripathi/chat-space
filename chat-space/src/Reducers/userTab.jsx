import {

    SET_TAB_DATA,
    SET_DEFAULT_VALUE,
} from "../Actions/actionConstant";
const initialState = {
    tabData: [],
};
function userTab(state = initialState, action) {
    switch (action?.type) {
        case SET_TAB_DATA:
            return {
                ...state,
                tabData: action?.payload?.tabData,
            };

        case SET_DEFAULT_VALUE:
            return initialState

        default:
            return state;
    }
}
export default userTab;
