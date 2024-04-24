import React from "react";
import "../styles/sign-up.scss";
import { Button, Form, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validationCheck } from "../hoc/generalFunctions";
import { SET_LOGIN_CREDENTIALS } from "../Actions/actionConstant";
import { SIGN_UP } from "../Constants/urls";
import "../styles/page-layout.scss"
import "../styles/button.scss"

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const [loading, setLoading] = useState(false);

  const [validationError, setValidationError] = useState({ status: false });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    profile: ''
  });

  const getImage = (type, file) => {
    var reader = new FileReader();
    reader?.readAsDataURL(file)
    reader.onload = () => {
      setUserData({
        ...userData,
        [type]: reader.result,
      });
    }
    reader.onerror = (error) => {
    }
  }

  const onChangeData = (type, value) => {
    if (type === "email") {
      setValidationError({
        status: false,
        isExistingEmail: false,
      });
    }

    if (value !== undefined) {
      setUserData({
        ...userData,
        [type]: value,
      });
    }

    // if (type === 'profile' && value !== undefined) {
    //   getImage(type, value)
    // } else
    //   if (value !== undefined) {
    //     setUserData({
    //       ...userData,
    //       [type]: value,
    //     });
    //   }

  };

  const submitDetails = () => {

    const file = userData.profile
    const formdata = new FormData();
    formdata.append('image', file)
    formdata.append('userData', JSON.stringify(userData))
    axios
      .post(process.env.REACT_APP_API_URL + SIGN_UP, formdata)
      .then((response) => {
        dispatch(
          {
            type: SET_LOGIN_CREDENTIALS,
            payload: {
              first_name: userData?.firstName,
              last_name: userData?.lastName,
              name: userData?.firstName + " " + userData?.lastName,
              email: userData?.email,
              password: userData?.password,
              mobile: userData?.mobile,
              profile_image: userData?.profile
            },
          },
          // navigate("/register-in-space")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isInValid = () => {
    setLoading(false)
    setValidationError({
      status: true,
    });
  };
  const isExistingEmail = () => {
    setLoading(false)
    setValidationError({
      isExistingEmail: true,
    });
  };
  const onFinish = (values) => {
    // setLoading(true)
    validationCheck(
      userDetails,
      userData,
      submitDetails,
      isExistingEmail,
      isInValid
    );
  };
  const onFinishFailed = (errorInfo) => {
  };

  return (
    <>
      <Spin spinning={loading}>
        <div className="sign-up page-layout">
          <div className="sign-up-content box-layout">
            <h3>Welcome to the Chat Space</h3>
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
                  placeholder="Mobile Number"
                  onChange={(event) => {
                    onChangeData("mobile", event?.target?.value);
                  }}
                />
              </Form.Item>

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
                <Input.Password
                  className="sign-up-input"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    onChangeData("password", event?.target?.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Profile "
                name="profile"
                rules={[
                  {
                    required: true,
                    message: "Please insert your profile",
                  },
                ]}
              >
                <input
                  type="file"
                  className="sign-up-input"
                  onChange={(event) => {
                    onChangeData("profile", event?.target?.files[0]);
                  }}
                />
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
};

export default Signup;
