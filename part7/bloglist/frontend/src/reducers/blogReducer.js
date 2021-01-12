import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'UPDATE_BLOGS':
            return action.data
        default:
            return state
    }
}


export const updateBlogs = (newBlogs) => {
    return {
        type:"UPDATE_BLOGS",
        data: newBlogs
    }
}

export const getBlogs = () => {
    return async dispatch => {
        let blogs = await blogService.getAll()
        blogs = blogs.sort( (a,b) => b.likes - a.likes)
    
        dispatch({
            type:'UPDATE_BLOGS',
            data: blogs
        })
    }


}

export default blogReducer