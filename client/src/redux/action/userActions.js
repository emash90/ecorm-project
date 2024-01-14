// For Login

export const userLoginRequest = () =>{
    
    return {
        type:"USER_LOGIN_REQUEST"
    }
}

export const userLoginSuccess = (user) =>{

    return {
        type:"USER_LOGIN_SUCCESS",
        payload:user
    }
}

export const userLoginFail = (error) =>{

    return {
        type:"USER_LOGIN_FAIL",
        payload:error
    }
}

// For Logout

export const userLogout = () =>{
    
        return {
            type:"USER_LOGOUT"
        }
    }

// For Register

export const userRegisterRequest = () =>{

return {
    type:"USER_REGISTER_REQUEST"
}
}

export const userRegisterSuccess = (user) =>{

return {
    type:"USER_REGISTER_SUCCESS",
    payload:user
}
}

export const userRegisterFail = (error) =>{

return {
    type:"USER_REGISTER_FAIL",
    payload:error
}
}
