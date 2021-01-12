import React, {useState, useEffect} from 'react'
import blogService from '../services/blogs'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getBlogs} from '../reducers/blogReducer'




const BlogView = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const id = useParams().id
    
    const [blog, setBlog] = useState({user:{}})

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
          .then(() => dispatch(getBlogs()))
    }   


     useEffect(() =>
       blogService
       .getBlog(id)
       .then(data => setBlog(data)),
       [])


    const addComment = (e) => {
      e.preventDefault()
      console.log(e.target.comment.value)
      blogService
      .postComment(blog.id, e.target.comment.value)
      .then(data => {
        let newBlog = {...blog}
        newBlog.comments = data.comments
        setBlog(newBlog)
    })
  }


    return(<div>
        
   
     <h2>{blog.title} {blog.author}</h2>

     <p><a href={blog.url}>{blog.url}</a></p>
     <p>{blog.likes} {blog.likes > 1 ? 'likes': 'like'}<button onClick={likeBlog}>like</button> </p>
     <p>added by {blog.user.username} </p>

    
    {blog.comments  ?
    <div>
        <h4>comments</h4>
        <form onSubmit={addComment}>
          <input name="comment"  />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map(
            comment => <li>{comment}</li> 
          )}
          
        </ul>
    </div>
      : <span></span> }
     
    </div>)

}

export default BlogView