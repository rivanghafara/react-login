import React, { useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../firebase'

export default function Cards({ props }) {
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
      <Card style={{ width: '15rem' }} className="mt-4 ml-4">
        <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_176c39a67d4%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_176c39a67d4%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.1015625%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
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
          <Button className="mt-3" disable={loading.toString()} variant="danger" onClick={e => (handleDelete(e, props.id))}>Del</Button>
        </Card.Body>
      </Card>
    </>
  )
}
