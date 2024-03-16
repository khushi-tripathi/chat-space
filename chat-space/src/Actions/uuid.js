import axios from "axios";
const addUuid = (uuid, primary_user, other_user, isGroup) => {
    return function (dispatch) {
        axios
            .post("http://localhost:4000/api/add-uuid", {
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