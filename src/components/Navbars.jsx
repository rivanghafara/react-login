import React from 'react'
import { Nav, Form, Button, FormControl, NavDropdown, Navbar } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Navbars() {
  const { currentUser, logout } = useAuth()
  
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Manage" id="basic-nav-dropdown">
            <NavDropdown.Item href="/manage/menu-item">Menu</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Employee</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Finance</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/manage/my-profile">My Profile</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <Link to="/manage/my-profile">{currentUser.email}</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
