import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Auth from "../../utils/auth";

// inline Styling
const styles = {
  header: {
    background: "#353740",
    maxHeight: "100px",
  },
  text: {
    color: "white",
    fontWeight: 700,
  },
  // brand: {
  //   fontWeight: 'bold',
  //   color: 'white',
  //   fontSize: 35,
  //   marginRight: 20
  // }
};

const Header = () => {
  const userRole = Auth.loggedIn() ? Auth.getProfile().data.role : null;
  console.log(userRole);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand id="logo" style={styles.brand}>
          <img
            src="/Rural.png"
            style={{ width: "auto", height: "300px", objectFit: "fill" }}
            alt="RuralTech logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />

        {/* Conditionally render "Admin" or "User" navbars */}
        {userRole === "ADMIN" && (
          <>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link style={styles.text} as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link style={styles.text} as={Link} to="/admin-dashboard">
                  Dashboard
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link
                  style={styles.text}
                  as={Link}
                  to="/product-category-manager"
                >
                  Product/Category Manager
                </Nav.Link>
              </Nav>

              <Nav className="me-auto">
                <Nav.Link style={styles.text} as={Link}>
                  <div>
                    {Auth.loggedIn() ? (
                      <>
                        <Button className="m-2" onClick={logout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          as={Link}
                          variant="primary"
                          className="m-2"
                          to="/login"
                        >
                          Login
                        </Button>
                        <Button
                          as={Link}
                          variant="secondary"
                          className="m-2"
                          to="/signup"
                        >
                          Signup
                        </Button>
                      </>
                    )}
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
