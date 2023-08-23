import { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName: fullname,
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
      localStorage.setItem("fullName", fullname);

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const rootDivStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "30px",
  };
  const formStyle = {
    maxWidth: 600,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",

    borderRadius: 30,
    padding: 30,
  };
  const formTitleStyle = { textAlign: "center", marginBottom: "30px" };
  const buttonsStyle = { textAlign: "center" };
  const resetButtonStyle = { width: "80px" };
  const signupButtonStyle = { width: "80px" };
  const backToLoginStyle = { textAlign: "center" };

  return (
    <div style={rootDivStyle}>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        style={formStyle}
        scrollToFirstError
      >
        <Form.Item>
          <h1 style={formTitleStyle}>CREATE ACCOUNT</h1>
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={buttonsStyle}>
          <Space direction="column">
            <Button type="primary" htmlType="submit" style={signupButtonStyle}>
              Sign Up
            </Button>
            <Button htmlType="reset" style={resetButtonStyle}>
              Reset
            </Button>
          </Space>
        </Form.Item>

        <Form.Item style={backToLoginStyle}>
          Already have an account? <Link to="/login">Login</Link> instead.
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterForm;
