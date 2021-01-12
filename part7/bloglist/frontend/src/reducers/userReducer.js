
const initialState = {
    userId: localStorage.getItem('user') || '' ,
    token : localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || ''
}

const userReducer = (state=initialState, action) =>{
    let newState = null
    switch(action.type){
        case 'SET_TOKEN':
            newState = {...state}
            newState.token = action.data.token
            localStorage.setItem('token', action.data.token)
            return newState
        case 'SET_USERID':
            newState = {...state}
            newState.userId = action.data.userId
            localStorage.setItem('userId', action.data.userId)
            return newState
        case 'SET_USER':
            newState = {...state}
            newState.user = action.data.user
            localStorage.setItem('user', action.data.user)
            return newState
        default:
            return state
    }
}


export const setUser = (user) => {
    return {
        type:'SET_USER',
        data:{user}
    }
}

export const setToken = (token) => {
    return {
        type:'SET_TOKEN',
        data:{token}
    }
}

export const setUserId = (userId) => {
    return {
        type:'SET_USERID',
        data:{userId}
    }
}



export default userReducer


