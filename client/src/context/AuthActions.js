export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
})

// TEST add Follow actions

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
})

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
})

//could also make follow error and unfollow error reducers