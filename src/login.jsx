import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  
  axios
      .post("http://localhost:8080/api/auth/login", values)
      .then((response) => {
        console.log("Response from backend: ", response.data);

        navigate("/");
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
      });
    };

  const formStyle = {
    border: "1px solid gray",
    borderRadius: 20,
    maxWidth: "300px",
    margin: "200px auto",
    height: "100%",
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    flexDirection: "column",
  };
  const formTitleStyle = { textAlign: "center" };
  const forgotLinkStyle = { float: "right" };
  const loginButtonStyle = { width: "100%" };
  const signupLinkStyle = { textAlign: "center" };

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={formStyle}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item style={formTitleStyle}>
        <h1>USER LOGIN</h1>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link
          to="/forgot-password"
          className="login-form-forgot"
          style={forgotLinkStyle}
        >
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={loginButtonStyle}
        >
          Login
        </Button>
      </Form.Item>
      <Form.Item style={signupLinkStyle}>
        Don't have an account? <Link to="/register">Sign up</Link> now!
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
