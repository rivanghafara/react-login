import React, { useEffect, useState } from 'react'
import { Card, Button, Alert, CardGroup, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Cards from './Cards'
import { db } from '../firebase'

export default function MenuItem() {
  const [items, setItems] = useState([])

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

  if (typeof items === 'undefined') return (<h2>No Data...</h2>)

  return (
    <>
      <Card className="p-3 justify-content-center">
        <h1>Menu Item</h1>
        <Link to="/create-item" style={{ maxWidth: "150px" }} className="btn btn-primary w-100 mt-3"> + Add New Item </Link>
        <CardGroup >
          <Row md={12} noGutters="false">
            {items.length > 0 ? items.map(item => (
              <Cards props={item} key={item.id}/>
            ))
              :
              <h2 className="m-4">Loading...</h2>
            }
          </Row>
        </CardGroup>
      </Card>
    </>
  )
}
