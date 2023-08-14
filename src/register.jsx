import { useState } from "react";
import { Button, Form, Input, Upload, Select, Space, message } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const rootDivStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const formStyle = {
    maxWidth: 600,
    border: "1px solid gray",
    borderRadius: 30,
    padding: 30,
  };
  const formTitleStyle = { textAlign: "center", marginBottom: "30px" };
  const avatarStyle = { width: "100%" };
  const uploadButtonStyle = { marginTop: 8 };
  const buttonsStyle = { textAlign: "center" };
  const resetButtonStyle = { width: "80px" };
  const signupButtonStyle = { width: "80px" };
  const backToLoginStyle = { textAlign: "center" };
  
  return (
    <div style={rootDivStyle}>
      <Form
        {...formItemLayout}
        form={form}
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
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
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
          <Input />
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
          <Input.Password />
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

        <Form.Item
          name="preferences"
          label="Preferences"
          tooltip="What do you like?"
        >
          <Select mode="multiple" placeholder="Select preferences">
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Avatar"
          tooltip="Choose your best looking picture!"
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleAvatarChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={avatarStyle} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={uploadButtonStyle}>Upload</div>
              </div>
            )}
          </Upload>
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
