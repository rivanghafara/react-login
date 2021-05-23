import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function EditItem(props) {
  let { id } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [payload, setPayload] = useState()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (id) {
      db.collection('items').doc(id).onSnapshot((snapshot) => { setPayload(snapshot.data()) })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      await db.collection('items').doc(id).update(payload)
      setMessage("Data has been saved")
      history.push("/manage/menu-item")
    } catch (error) {
      setError("Failed to save data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {(typeof payload === 'undefined') ? <h2>Loading...</h2> : <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit item</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="userName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" disabled placeholder={currentUser.email} />
            </Form.Group>
            <Form.Group id="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" id="item_name" defaultValue={payload.item_name} onChange={e => setPayload({ ...payload, item_name: e.target.value })} />
            </Form.Group>
            <Form.Group id="text">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={payload.item_desc} onChange={e => setPayload({ ...payload, item_desc: e.target.value })} />
            </Form.Group>
            <Form.Group id="priceTag">
              <Form.Label>Item Price</Form.Label>
              <Form.Control type="number" id="item_price" defaultValue={payload.item_price} onChange={e => setPayload({ ...payload, item_price: e.target.value })} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Save Item</Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/manage/menu-item">Cancel</Link>
          </div>
        </Card.Body>
      </Card>}
    </>
  )
}
