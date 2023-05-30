import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Auth from "../utils/auth";

const styles = {
  div: {
    padding: 30,
    margin: 30,
    borderRadius: 20,
  },
  h3: {
    fontWeight: 700,
    color: 'white'
  }
};

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div style={styles.div}>
        <h3 style={styles.h3}>Login</h3>
        <Form onSubmit={handleFormSubmit} className="mb-3  ">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{color: 'white'}}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={formState.email}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{color: 'white'}}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formState.password}
              name="password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {error && <Alert variant="danger">{error.message}</Alert>}
      </div>
    </>
  );
};

export default Login;
