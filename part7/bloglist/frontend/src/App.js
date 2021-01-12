import React, { useState, useEffect, useRef} from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import MyNavbar from './components/MyNavbar'
import blogService from './services/blogs'
import {useDispatch, useSelector} from 'react-redux'
import {setNotification} from './reducers/notificationReducer'
import {getBlogs} from './reducers/blogReducer'
import {setUserId, setToken, setUser} from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"


const App = () => {

  const dispatch = useDispatch()

  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const userId = useSelector(state => state.user.userId)
 
  const notification = useSelector(state => state.notification)
  
  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const blogFormRef = useRef()

  const handleUsernameChange = (val) => setUsername(val)
  const handlePasswordChange = (val) => setPassword(val)

  const notify = (message, type) => dispatch(setNotification([message, type], 2))


  const handleLoginSubmit = (e) => {
    e.preventDefault()
    blogService
    .getToken({username, password})
    .then( ({token, username, id}) => {
      if(token !== null){
        dispatch(setToken(token))
        dispatch(setUser(username))
        dispatch(setUserId(id))
        setUsername('')
        setPassword('')
      }
    })
    .catch(err => notify(err.message, 'err'))
  }
  


  const handleBlogFormSubmit = (e, blogTitle, blogUrl, blogAuthor) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()

      const postObj = {
        user: userId,
        title: blogTitle,
        url: blogUrl,
        author: blogAuthor
      }

      blogService
      .postBlog(postObj, token)
      .then(savedObj =>  notify(`a new blog ${savedObj.title} by ${savedObj.author} added!`, ''))
      .then(() => dispatch(getBlogs()))
     
  }




  useEffect(() => dispatch(getBlogs()) , [dispatch])  


  return (
    <div>
      <Router>
        <Notification message={notification[0]} type={notification[1]}/>
        
        {user === '' ? 
        <LoginForm 
          username={username} 
          password={password} 
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLoginSubmit={handleLoginSubmit} 
          /> :
          <div>
            <MyNavbar />
            <h2>blogs</h2>
            
          
          <Switch>
          <Route path="/blogs/:id">
              <BlogView />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
                <Toggleable outerButtonLabel='new blog' ref={blogFormRef}>
                  <BlogForm
                      handleBlogFormSubmit={handleBlogFormSubmit} />
              </Toggleable>
              
              <Blogs  />
            </Route>
          </Switch>
         
        </div>
        }
        </Router>
      
    </div>
  )
}

export default App