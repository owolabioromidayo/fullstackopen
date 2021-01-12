import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'
import {setToken, setUser, setUserId} from '../reducers/userReducer'
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

const MyNavbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [homeRedirect, setHomeRedirect] = useState(false)

    const padding = {
        padding: '10px 10px 10px 10px'
    }

    const handleLogout = () => {
        dispatch(setToken(''))
        dispatch(setUser(''))
        dispatch(setUserId(''))  
        setHomeRedirect(true)
      }

    return(<div>
        <Router>
            {!homeRedirect || <Redirect to="/" /> }
        <Navbar  className="bg-secondary" collapseOnSelect expand="lg" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
        
                <Nav.Link href="/blogs" as="span">
                    <Link style={padding} to="/">blogs        </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <Link  style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    {!user || <span><em>{user} logged in</em> <button className="btn btn-light" onClick={handleLogout}>log out</button></span> }
                
                </Nav.Link>
            </Nav>
    
        </Navbar.Collapse>
        </Navbar>
        </Router>
    </div>)
}

export default MyNavbar