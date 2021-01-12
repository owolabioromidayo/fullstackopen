import React, {useState, useEffect} from 'react'
import userService from '../services/users'
import {useParams} from 'react-router-dom'



const Users = () => {

    const id = useParams().id
    const [user, setUser] = useState({blogs: []})

    useEffect(() => {
        userService
        .getUser(id)
        .then(data => setUser(data))
    }, [id])

    return(<div>
     <h2>{user.username}</h2>
     <p><b>added blogs</b></p>
     <ul>
         {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
     </ul>
    </div>)

}

export default Users