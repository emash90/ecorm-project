
const user = {
    user: null,
    loading: false,
    error: null,
};

const handle_user_info = (state = user, action) => {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
        case "USER_REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "USER_LOGIN_SUCCESS":
        case "USER_REGISTER_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case "USER_LOGIN_FAIL":
        case "USER_REGISTER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "USER_LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export default handle_user_info;