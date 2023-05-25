import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Auth from '../../utils/auth';
import { Navigate } from 'react-router-dom';


const DashboardList = ({ statInfo }) => {
  if (Auth.loggedIn()) {
    return (
      <Row>
        <Col xs={12} sm={12} md={4}>
          <ListGroup>
            <ListGroup.Item>
              Total Stock: {statInfo.totalProductQuantity}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Total Products: {statInfo.productCount}{" "}
            </ListGroup.Item>
            <ListGroup.Item>Total Orders: {statInfo.orderCount}</ListGroup.Item>
            <ListGroup.Item>
              Total Orders to-date: {statInfo.totalOrderQuantity}
            </ListGroup.Item>
            <ListGroup.Item>Total Revenue: PLACEHOLDER</ListGroup.Item>
            <ListGroup.Item>Last 30-Day Sales: </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default DashboardList;