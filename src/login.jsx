import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';

export const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{
        maxWidth: "300px", margin: "200px auto", height: "100%", display: "flex", padding: "20px",
        justifyContent: "center",
        flexDirection: "column"
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Divider><h1>User Login</h1></Divider>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
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

        <a className="login-form-forgot" href="" style={{ float: "right" }}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>      </Form.Item>
    </Form>
  );
};
export const Login = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};
