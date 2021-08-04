import React from 'react'
import { Button, Modal } from 'react-bootstrap'


export default function Dialog({ title, desc, isShow, handleClose, handleDelete} ) {
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{desc}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
