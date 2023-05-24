import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { PRODUCT_INFO } from '../utils/queries';
import { useQuery } from "@apollo/client";

const styles = {
  button: {
    margin: 10,
    // padding: 10
    border: '1px solid',
    borderColor: 'black'
  }
}
const AdminDash = () => {
  // dashboard admin table
//  const [productInfo, { error }] = useQuery(PRODUCT_INFO);
 


  return (
    <div>
      <div className="">
        <p className="">
          From the dashboard you can control Product Management and alter
          specific items and categories, start by choosing an option below.
        </p>
      </div>
      <Row>
        <Col xs={12} sm={12} md={4} > 
          <ListGroup>
            <ListGroup.Item>Total Stock: </ListGroup.Item>
            <ListGroup.Item>Total Products: </ListGroup.Item>
            <ListGroup.Item>Total Orders: PLACEHOLDER</ListGroup.Item>
            <ListGroup.Item>Total Revenue: PLACEHOLDER</ListGroup.Item>
            <ListGroup.Item>Last 30-Day Sales: </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Button style={styles.button} variant="primary" size="lg" active>
        Products
      </Button>{" "}
      <Button style={styles.button} variant="primary" size="lg" active>
        Categories
      </Button>{" "}
    </div>
  ); 
};

export default AdminDash;
