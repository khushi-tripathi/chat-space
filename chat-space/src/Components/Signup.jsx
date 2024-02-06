import React, { useEffect } from "react";
import "../styles/sign-up.scss";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AfterSignUp from "./AfterSignUp";
import { useDispatch, useSelector } from "react-redux";
import { registeredUserDetails } from "../Actions/registeredUserDetails";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const [validationError, setValidationError] = useState({ status: false });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    console.log(userDetails);
    // data.map(( value , i) => { console.log(i , value)})
    debugger;
    dispatch(registeredUserDetails());
  }, [0]);

  // const onChangeData = (type, value) => {
  //   setValidationError({
  //     status: false,
  //     isExistingEmail: false,
  //   });
  //   // console.log("userData", userData);
  // };

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
    console.log("userData", userData);
  };

  const submitDetails = () => {
    // axios
    //   .post("http://localhost:4000/api/sign-up", userData)
    //   .then((response) => {
    //     console.log("Khushi", response);
    //     // setNextPageData({
    //     //   flag: true,
    //     // });
    //     navigate("/register-in-space");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const validationCheck = () => {
    // registeredUserDetails();
    const existingEmail = userDetails?.userDetails?.filter(
      (e, i) => e.email === userData?.email
    );
    debugger;
    if (
      // userData?.firstName?.length &&
      // userData?.lastName?.length &&
      // userData?.mobile?.length &&
      // userData?.email?.length &&
      userData?.email.includes("@") &&
      !existingEmail?.length
    ) {
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
    console.log("Success:", values);
    validationCheck();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="sign-up">
        <div className="sign-up-content">
          <h3>Welcome to the CHAT SPACE</h3>
          <h4>Sign Up / Login</h4>
          <Form
            name="basic"
            // initialValues={{
            //   remember: true,
            // }}
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
                onChange={(event) => {
                  onChangeData("mobile", event?.target?.value);
                }}
              />
            </Form.Item>

            {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="basic-properties sign-up-button"
                type="submit"
                // onClick={validationCheck}
                htmlType="submit"
              >
                GOOD TO GO!!
              </Button>
            </Form.Item>
          </Form>

          {/* <Input
            required={true}
            className="sign-up-input"
            placeholder="First Name"
            onChange={(event) => {
              onChangeData("firstName", event?.target?.value);
            }}
            prefix={<UserOutlined />}
          />
          <Input
            className="sign-up-input"
            placeholder="Last Name"
            onChange={(event) => {
              onChangeData("lastName", event?.target?.value);
            }}
            prefix={<UserOutlined />}
          />
          <Input
            className="sign-up-input"
            placeholder="Email Address"
            onChange={(event) => {
              onChangeData("email", event?.target?.value);
            }}
            prefix={<MailOutlined />}
          />
          <Input
            className="sign-up-input"
            placeholder="Mobile Number"
            onChange={(event) => {
              onChangeData("mobile", event?.target?.value);
            }}
            type="Number"
            prefix={<PhoneOutlined />}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
