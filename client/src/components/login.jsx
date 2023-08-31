import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/login.css";
import { loginUserMutation } from "../store/slice/userSlice";
import { LockOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const [showRegistration, setShowRegistration] = useState(false);
  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };
  const onFinish = (values) => {
    // console.log(values);
    const { email, password } = values;
    dispatch(loginUserMutation({ email, password }));
  };
  const onRegistrationFinish = (values) => {
    // Your registration form submission logic here
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className="login-form-title">ChatApp</h1>
        <Form.Item
          name="email"
          hasFeedback={true}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback={true}
          // validateStatus="success"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 5,
              message: "Password must be at least 6 characters",
            },
            {
              max: 20,
              message: "Password must be at most 20 characters",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {/* <a className="login-form-forgot" href="#">
          Forgot password
        </a> */}
        {/* </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="http://localhost:5173/">Not a user? Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
