import React from 'react'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'
import {useSelector, useDispatch} from 'react-redux'
import {getBlogs} from '../reducers/blogReducer'
import blogs from '../services/blogs'


const Blog = ({ id }) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const userId = useSelector(state => state.user.userId)
    const blog = useSelector(state => state.blogs).find(blog => blog.id === id)
    
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    const likeBlog = () => {
      const obj = {
        user: blog.user.id,
        likes : blog.likes + 1,
        author : blog.author,
        title : blog.title,
        url : blog.url
  
      }
  
      blogService
      .likeBlog(obj, blog.id, token)
      .then(() => dispatch(getBlogs()) )
  
    }
  
    const deleteBlog = () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          blogService.deleteBlog(token, blog.id)
          .then(() => dispatch(getBlogs()) )
      }
    }
  
    return(
    <div style={blogStyle}>
      <a href={"/blogs/"+blog.id}>{blog.title} {blog.author} </a>
      <Toggleable outerButtonLabel='view' innerButtonLabel='hide' style={{display:'inline'}} >
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a> <br />
        likes {blog.likes} <button onClick={likeBlog}>like</button> <br/>
        {blog.user.name} <br />
    
        {userId === blog.user.id ? <button onClick={deleteBlog}>remove</button>: null } <br />
    </Toggleable>
    </div>
    )
  
  }
  

export default Blog
