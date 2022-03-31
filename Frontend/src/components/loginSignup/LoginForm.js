import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import SignupForm from "./SignupForm";

function LoginForm(props) {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginFormValue, setLoginFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleLoginFormChange = (e) => {
    setLoginFormValue({
      ...loginFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowSignup = () => {
    setShowSignupForm(true);
    props.onHide();
  };
  const handleHideSignup = () => {
    setShowSignupForm(false);
  };
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginFormValue);
  };
  return (
    <>
      <SignupForm show={showSignupForm} onHide={handleHideSignup} />
      <div
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <Modal {...props}>
          <Modal.Header closeButton>
            <Modal.Title>
              Login &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="float-right"
                variant="outline-dark"
                size="sm"
                onClick={handleShowSignup}
                style={{ marginLeft: "auto" }}
              >
                {" "}
                Register
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLoginFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginFormValue.email}
                  onChange={handleLoginFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginFormValue.password}
                  onChange={handleLoginFormChange}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2 rounded-circle">
                <Button variant="dark" type="submit" size="md">
                  {" "}
                  Login
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default LoginForm;