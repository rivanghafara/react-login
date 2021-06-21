import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Navbars() {
  const { currentUser } = useAuth()
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/manage/menu-item">Menu</Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {currentUser === null ? <Nav.Link disable="false" href="/login">Login</Nav.Link> : <Link to="/manage/my-profile" disable="false">{currentUser.email}</Link>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
