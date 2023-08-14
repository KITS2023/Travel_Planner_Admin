import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailIsValid(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    axios
      .post(
        "/api/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitted(true);
          setSuccessMessage("Password reset email sent successfully.");
          setErrorMessage("");
        } else if (response.status === 404) {
          setIsSubmitted(true);
          setSuccessMessage("");
          setErrorMessage("Email not found. Please check your email address.");
        } else {
          throw new Error("Failed to send password reset email.");
        }
      })
      .catch((error) => {
        setIsSubmitted(true);
        setSuccessMessage("");
        setErrorMessage("An error occurred. Please try again later.");
        console.error("Error:", error);
      });
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "100px auto",
    padding: 20,
    textAlign: "center",
    border: "1px solid gray",
    borderRadius: 20,
  };

  const submitButton = { width: "100%" };
  const backButton = { width: "100%" };
  return (
    <Form onSubmit={handleSubmit} style={formStyle}>
      <Form.Item>
        <h2>FORGOT PASSWORD</h2>
      </Form.Item>
      <Form.Item>
        Enter your email and we'll send you a link to reset your password.
      </Form.Item>
      <Form.Item name="email">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          prefix={<Icon icon="ic:outline-email" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item style={{ margin: 0 }}>
        <Button type="primary" htmlType="submit" style={submitButton}>
          Submit
        </Button>
        <Button type="text" style={backButton}>
          <Link to="/login">
            <LeftOutlined /> Back to Login
          </Link>
        </Button>
      </Form.Item>
      {isSubmitted && successMessage && <p>{successMessage}</p>}
      {isSubmitted && errorMessage && <p>{errorMessage}</p>}
    </Form>
  );
};

export default ForgotPasswordPage;
