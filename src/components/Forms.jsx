import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

export default function Forms(props) {
  return (
    <>
      <Form.Group id={props.id}>
        <Form.Label>{props.name}</Form.Label>
        <Form.Control type="text" value={props.current.value} />
      </Form.Group>
    </>
  )
}
