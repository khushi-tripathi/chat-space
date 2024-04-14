import {
    FETCH_GROUP_INFO,
    SET_DEFAULT_VALUE,
} from "../Actions/actionConstant";
const initialState = {
    groupData: [],
};
function groupDetails(state = initialState, action) {
    switch (action?.type) {
        case FETCH_GROUP_INFO:
            return {
                ...state,
                groupData: action?.payload?.groupData,
                isGroupDataUpdated: action?.payload?.isGroupDataUpdated || false
            };

        case SET_DEFAULT_VALUE:
            return initialState

        default:
            return state;
    }
}
export default groupDetails;
