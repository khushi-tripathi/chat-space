import React, { useEffect } from "react";
import "../styles/sign-up.scss";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registeredUserDetails } from "../Actions/registeredUserDetails";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const [validationError, setValidationError] = useState({ status: false });
  const [pageType, setPageType] = useState({ page: "signUp" });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  useEffect(() => {
    dispatch(registeredUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeData = (type, value) => {
    if (type === "email") {
      setValidationError({
        status: false,
        isExistingEmail: false,
      });
    }
    setUserData({
      ...userData,
      [type]: value,
    });
  };

  const submitDetails = () => {
    axios
      .post("http://localhost:4000/api/sign-up", userData)
      .then((response) => {
        navigate("/register-in-space");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validationCheck = () => {
    const existingEmail = userDetails?.userDetails?.filter(
      (e, i) => e.email === userData?.email
    );
    if (userData?.email.includes("@") && !existingEmail?.length) {
      submitDetails();
    } else if (existingEmail?.length) {
      setValidationError({
        isExistingEmail: true,
      });
    } else {
      setValidationError({
        status: true,
      });
    }
  };
  const onFinish = (values) => {
    validationCheck();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangePage = (type) => {
    setPageType({
      page: type === "sign" ? "signUp" : "login",
    });
  };
  return (
    <>
      <div className="sign-up">
        <div className="sign-up-content">
          <h3>Welcome to the CHAT SPACE</h3>
          <Col>
            <Row>
              <Button onClick={() => onChangePage("sign")}>Sign Up</Button>
              <Button onClick={() => onChangePage("login")}>Login</Button>
            </Row>
          </Col>

          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            {pageType?.page === "signUp" && (
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input
                  className="sign-up-input"
                  placeholder="First Name"
                  onChange={(event) => {
                    onChangeData("firstName", event?.target?.value);
                  }}
                />
              </Form.Item>
            )}
            {pageType?.page === "signUp" && (
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input
                  className="sign-up-input"
                  placeholder="Last Name"
                  onChange={(event) => {
                    onChangeData("lastName", event?.target?.value);
                  }}
                />
              </Form.Item>
            )}

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
            {pageType?.page === "signUp" && (
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number",
                  },
                ]}
              >
                <Input
                  className="sign-up-input"
                  placeholder="Monile Number"
                  onChange={(event) => {
                    onChangeData("mobile", event?.target?.value);
                  }}
                />
              </Form.Item>
            )}

            {pageType?.page === "login" && (
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
            )}

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
};

export default Signup;
