import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function AddItem() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [payload, setPayload] = useState()
  const { currentUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      await db.collection('items').add(payload)
      setMessage("Data has been saved")
      e.target.reset();
    } catch (error) {
      setError("Failed to save data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add new item</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="userName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" disabled placeholder={currentUser.email} />
            </Form.Group>
            <Form.Group id="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" id="item_name" onChange={e => setPayload({ ...payload, item_name: e.target.value })} />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={e => setPayload({ ...payload, item_desc: e.target.value })} />
            </Form.Group>
            <Form.Group id="priceTag">
              <Form.Label>Item Price</Form.Label>
              <Form.Control type="number" id="item_price" onChange={e => setPayload({ ...payload, item_price: e.target.value })} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Save Item</Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Button variant="link" disabled={loading}>
              <Link to="/manage/menu-item" >Cancel</Link>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}