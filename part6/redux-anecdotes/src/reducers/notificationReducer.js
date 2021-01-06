const notificationReducer = (state='', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data

        case 'REMOVE_NOTIFICATION':
            return ''

        default:
            return state
    }
}

// export const setNotification = (notification) => {
//     return {
//         type: 'SET_NOTIFICATION',
//         data:{notification}
//     }
// }

export const removeNotification = (notification) => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type:'SET_NOTIFICATION',
            data: message
        })
        setTimeout(() => {
            dispatch({
            type:'REMOVE_NOTIFICATION'
        })}, timeout*1000)
    }
}

export default notificationReducer