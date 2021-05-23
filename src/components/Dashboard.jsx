import React, { useEffect, useState } from 'react'
import { Card, Button, Alert, CardGroup, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import Cards from './Cards'
import MenuItem from './MenuItem'

export default function Dashboard() {
  const [error, setError] = useState("")
  const [items, setItems] = useState([])
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  useEffect(() => {
    db.collection('items').onSnapshot(snapshot => (
      setItems(snapshot.docs.map(doc => ({
        id: doc.id,
        item_name: doc.data().item_name,
        item_desc: doc.data().item_desc,
        item_price: doc.data().item_price
      })))
    ))
  }, [])

  async function HandleLogout() {
    setError("")
    try {
      await logout()
      history.push('/login')
    } catch (error) {
      setError('Failed to logout')
    }
  }
  return (
    <>
      <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="update-profile" className="btn btn-primary w-100 mt-3"> Update Profile </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={HandleLogout}>Log out</Button>
        </div>
    </>
      )
}
