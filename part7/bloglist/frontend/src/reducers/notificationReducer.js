const notificationReducer = (state=[null, ''], action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data

        case 'REMOVE_NOTIFICATION':
            return [null, '']

        default:
            return state
    }
}




export const setNotification = (newNotification, timeout) => {
    return async dispatch => {
        dispatch({
            type:'SET_NOTIFICATION',
            data: newNotification
        })
        setTimeout(() => {
            dispatch({
            type:'REMOVE_NOTIFICATION'
        })}, timeout*1000)
    }
}

export default notificationReducer