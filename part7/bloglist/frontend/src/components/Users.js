import React, {useState, useEffect} from 'react'
import userService from '../services/users'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService
        .getAll()
        .then(data => setUsers(data))
    })

    return(<div>
        <h2>Users</h2>
        <table >
            <thead>
                <td></td>
                <td><b>blogs created</b></td>
            </thead>

            <tbody>
                {users.map(user =>
                    <tr>
                        <td><a href={"/users/"+user.id}>{user.username}</a></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                    )}
            </tbody>
        </table>
    </div>)

}

export default Users