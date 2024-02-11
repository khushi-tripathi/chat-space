import React, { useEffect } from "react";
import "../styles/sign-up.scss";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registeredUserDetails } from "../Actions/registeredUserDetails";
import "../styles/sign-up.scss";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState({ status: false });
  // const [pageType, setPageType] = useState({ page: "signUp" });
  const [loginData, setLoginData] = useState({
    email: "",
    pswd: "",
  });
  useEffect(() => {
    dispatch(registeredUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeData = (type, value) => {
    setLoginData({
      ...loginData,
      [type]: value,
    });
  };

  const submitDetails = () => {
    axios
      .post("http://localhost:4000/api/login", { ...loginData })
      .then((response) => {
        navigate("/chat");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = (values) => {
    submitDetails();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="sign-up">
        <div className="sign-up-content">
          <h3>Welcome to the CHAT SPACE</h3>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="sign-up-input"
                placeholder="Email Address"
                onChange={(event) => {
                  onChangeData("email", event?.target?.value);
                }}
              />
            </Form.Item>

            {validationError?.isExistingEmail && (
              <p>Already occupied email. Please enter another!</p>
            )}
            {validationError?.status && <p>Please provide valid email!</p>}

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="sign-up-input" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="basic-properties sign-up-button"
                type="submit"
                htmlType="submit"
              >
                GOOD TO GO!!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
