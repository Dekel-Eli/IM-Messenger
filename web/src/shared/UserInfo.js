
const UserInfo = (props) => {

    // return props.action[props.profile];
    if (props.action === "get") {
        return state;
    }
    else if (props.action === "set") {
        state = props.profile
    }

}
export default UserInfo;

// export const setUser = (profile) => {
//     state = profile;
// };

// export const getUser = (profile) => {
//     return state;
// };


let state = undefined;