import React, { useEffect, useState } from 'react'
import { Card, Button, Alert, CardGroup, Row, Col, Table, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { db } from '../firebase'
import CenteredModal from './Modal'

export default function EmployeeItem() {
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    db.collection('employees').onSnapshot(snapshot => (
      setEmployees(snapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email,
        name: doc.data().name,
        role: doc.data().auth,
        status: doc.data().isActive
      })))
    ))
  }, [])

  const EditEmployee = (payload) => {
    setShowModal(true)
    setSelected(payload)
    return
  }

  if (typeof employees === 'undefined') return (<h2>No Data...</h2>)

  return (
    <div>
      <h1>Employees List</h1>
      <br/>
      <Button variant="primary">+ Add Employee</Button>
      <hr/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.length > 0 ? employees.map((employee, idx) => (
              <tr key={employee.id}>
                <td>{idx + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.status ? "Active" : "Inactive"}</td>
                <td>
                  <Button variant="info" onClick={() => EditEmployee(employee)}>Edit</Button>{' '}
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
              :
              <tr>Loading...</tr>
          }
        </tbody>
      </Table>
      <CenteredModal
        show={showModal}
        onHide={() => setShowModal(false)}
        payload={selected}
      />
    </div>
  )
}
