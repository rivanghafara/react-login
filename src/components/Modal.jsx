import React, { useState, useRef } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { db } from '../firebase';


export default function CenteredModal(props) {
  const initialState = {
    name: props.payload.name,
    auth: props.payload.role,
    isActive: props.payload.status
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [payload, setPayload] = useState(initialState)


  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.payload.email}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridnName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={(e) => setPayload({...payload, name: initialState.name || e.target.value})} defaultValue={props.payload.name}/>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Change Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formBasicCheckbox.SelectRole">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setPayload({...payload, auth: initialState.role})} defaultValue={initialState.role}>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Security">Security</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formBasicCheckbox.SelectActive">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" custom onChange={(e) => setPayload({...payload, isActive: initialState.status || e.target.value ? "Active" : "Inactive"})} defaultValue={props.payload.status ? "Active" : "Inactive"}>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}