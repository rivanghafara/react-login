import React, { useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function Tables({ items }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleDelete = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      await db.collection('items').doc(id).delete()
      setMessage("Data has been delete")
    } catch (error) {
      setError("Failed to delete data")
    } finally {
      setLoading(true)
    }
  }


  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map((item, idx) => (
            // if table has data
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.item_name}</td>
              <td>{item.item_desc}</td>
              <td>{item.item_price}</td>
              <td>
                <Link to={{
                  pathname: `/edit-item/${item.id}`,
                  itemsProps: item
                }}>
                  <Button variant="success">Edit</Button>
                </Link>
                <Button variant="danger" onClick={e => (handleDelete(e, item.id))}>Delete</Button>
              </td>
            </tr>
          )) :
            // if table is empty
            <tr>
              <td colSpan="5">No data </td>
            </tr>
          }
        </tbody>
      </Table>
    </>
  )
}
