// src/SignIn.js
import React, { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./App.css";

const SignIn = () => {
  const navigate = useNavigate();

  // Local login fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLocalLogin = () => {
    if (name.trim() && email.trim()) {
      navigate("/checkout");
    } else {
      alert("Please enter both name and email.");
    }
  };

  const handleFacebookResponse = (response) => {
    if (response && response.accessToken) {
      navigate("/checkout");
    } else {
      alert("Facebook login failed.");
    }
  };

  return (
    <Container className="cart-screen">
      <h2 className="cart-title">Sign In</h2>
      <p>Please login using one of the following:</p>

      {/* Local login box */}
      <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px" }}>
        <Form>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <Button color="success" onClick={handleLocalLogin}>
            Login
          </Button>
        </Form>
      </div>

      {/* Spacing */}
      <div style={{ height: "25px" }}></div>

      {/* Facebook Login button */}
      <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        render={(renderProps) => (
          <Button
            color="primary"
            style={{
              backgroundColor: "#4267B2",
              width: "300px",
            }}
            onClick={renderProps.onClick}
          >
            <i className="fa fa-facebook" style={{ marginRight: "10px" }}></i>
            LOGIN WITH FACEBOOK
          </Button>
        )}
      />
    </Container>
  );
};

export default SignIn;
