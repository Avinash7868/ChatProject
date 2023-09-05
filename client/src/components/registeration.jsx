import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slice/userSlice";
import { Link } from "react-router-dom";
import { Form, Input, Button, Typography, Alert } from "antd";
import "../assets/Registration.css";

const { Title } = Typography;

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let img = "";
    if (
      !values.image ||
      values.image === "undefined" ||
      values.image === "" ||
      values.image === null
    ) {
      img = values.image = "gravtar.png";
    } else {
      //Below is the fakepath of the image and change it to the image name
      img = values.image.split("\\")[2];
    }
    console.log(values);
    console.log(img);
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      img: img,
    };
    console.log(userData);
    dispatch(registerUser(userData));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="registration">
      <Form
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form"
      >
        {/* <Title level={3}>Registration</Title> */}
        <h3 className="reg-head">REGISTRATION</h3>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters long" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Enter your password again" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: false, message: "Please select an image" }]}
        >
          <Input type="file" />
        </Form.Item>
        {errorMessage && <Alert type="error" message={errorMessage} />}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link">
            <Link to="http://localhost:5173/login" className="link2">
              Login?
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
