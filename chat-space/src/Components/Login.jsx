import React, { useEffect } from "react";
import "../styles/sign-up.scss";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/sign-up.scss";
import { validationCheck } from "../hoc/generalFunctions";
import { SET_LOGIN_CREDENTIALS } from "../Actions/actionConstant";
import "../styles/button.scss"
import "../styles/page-layout.scss"

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState({ status: false });
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChangeData = (type, value) => {
    if (type === "email") {
      setValidationError({
        status: false,
        isNotExistingEmail: false,
      });
    }
    setLoginData({
      ...loginData,
      [type]: value,
    });
  };

  const login = (loginUser) => {
    setTimeout(() => {
      dispatch(
        {
          type: SET_LOGIN_CREDENTIALS,
          payload: loginUser[0],
        },
        navigate("/chat")
      );
    }, 500);
  };

  const isInValid = () => {
    setLoading(false)
    setValidationError({
      status: true,
    });
  };
  const isNotExistingEmail = () => {
    setLoading(false)
    setValidationError({
      isNotExistingEmail: true,
    });
  };

  const onFinish = (values) => {
    setLoading(true)
    validationCheck(
      userDetails,
      loginData,
      isNotExistingEmail,
      login,
      isInValid
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Spin spinning={loading}>

        <div className="sign-up page-layout">

          <div className="login sign-up-content box-layout ">
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

              {validationError?.isNotExistingEmail && (
                <p>This email is not exist! Try again...</p>
              )}
              {validationError?.status && <p>Please provide valid email!</p>}

              <Form.Item
                label="Password"
                name="password"
                onChange={(event) => {
                  onChangeData("password", event?.target?.value);
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="sign-up-input" placeholder="Enter Password" />
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
      </Spin>

    </>
  );
}
