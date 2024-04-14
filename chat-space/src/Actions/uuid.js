import axios from "axios";
import { ADD_UUID } from "../Constants/urls";
const addUuid = (uuid, primary_user, other_user, isGroup) => {
    return function (dispatch) {
        axios
            .post(process.env.REACT_APP_API_URL + ADD_UUID, {
                uuid,
                primary_user,
                other_user,
                isGroup
            })
            .then((response) => {

            })
            .catch((error) => {
                console.error(error);
            });
    };
}
export {
    addUuid,
}