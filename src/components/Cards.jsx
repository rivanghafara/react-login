import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import Dialog from './Dialog'

export default function Cards({ props }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [dialogShow, setDialogShow] = useState(false)

  const handleDialog = () => (setDialogShow(!dialogShow))

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
      setLoading(false)
      setDialogShow(false)
    }
  }

  return (
    <>
      <Dialog title={`Delete ${props.item_name}`} desc="You will not have access to this item anymore. Are you sure?" isShow={dialogShow} handleClose={handleDialog} handleDelete={e => (handleDelete(e, props.id))}/>
      <Card style={{ width: '15rem' }} className="mt-4 ml-4">
        <Card.Img variant="top" src="https://dummyimage.com/286x180/2b2b2b/969696.png" />
        <Card.Body>
          <Card.Title>{props.item_name}</Card.Title>
          <Card.Text>{props.item_desc}</Card.Text>
          <Card.Subtitle>{props.item_price}</Card.Subtitle>
          <br />
          <Link to={{
            pathname: `/edit-item/${props.id}`,
            itemsProps: props
          }}>
            <Button variant="success" className="mr-3 mt-3">Edit item</Button>
          </Link>
          {/* <Button className="mt-3" disable={(loading === true) ? "true": "false"} variant="danger" onClick={e => (handleDelete(e, props.id))}>Del</Button> */}
          <Button className="mt-3" disable={(loading === true) ? "true": "false"} variant="danger" onClick={handleDialog}>Del</Button>
        </Card.Body>
      </Card>
    </>
  )
}
