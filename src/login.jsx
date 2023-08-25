import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image } from "antd";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          usernameOrEmail: username,
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
      // localStorage.setItem('username', username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.data));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const formStyle = {
    borderRadius: 20,
    maxWidth: "300px",
    margin: "200px auto",
    height: "100%",
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    flexDirection: "column",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };
  const formTitleStyle = { textAlign: "center" };
  const forgotLinkStyle = { float: "right" };
  const loginButtonStyle = { width: "100%" };
  const signupLinkStyle = { textAlign: "center" };
  const logoStyle = { textAlign: "center" };
  return (
    <Form
      name="normal_login"
      className="login-form"
      style={formStyle}
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item style={logoStyle}>
        <Image width={100} src="\logo.png" preview={false} />
      </Form.Item>
      <Form.Item style={formTitleStyle}>
        <h1>User Login</h1>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link
          to="/resetPassword"
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
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form.Item>
      <Form.Item style={signupLinkStyle}>
        Do not have an account? <Link to="/register">Sign up</Link> now!
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
