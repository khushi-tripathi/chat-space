import React, { useEffect } from "react";
import "../styles/sign-up.scss";
import { Button, Col, Form, Input, Row, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validationCheck } from "../hoc/generalFunctions";
import { SET_LOGIN_CREDENTIALS } from "../Actions/actionConstant";
import { UploadOutlined } from '@ant-design/icons';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redux = useSelector((state) => state);
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const [validationError, setValidationError] = useState({ status: false });
  const [pageType, setPageType] = useState({ page: "signUp" });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    profile : null
  });

  // const props = {
  //   name: 'file',
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  //   maxCount : 1,
  //   beforeUpload: () => {
  //     return false;
  //   },
  //   onChange(info) {
  //     // if (info.file.status === 'uploading') {
  //       console.log("Upload on CHange" ,info.file, info.fileList[0]);
  //     // }

  //     setUserData({
  //       ...userData,
  //       ["profile"]: info.fileList[0],
  //     });
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } 
  //     // else if (info.file.status === 'error') {
  //     //   message.error(`${info.file.name} file upload failed.`);
  //     // }
  //   },
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
  };

  const submitDetails = () => {

    let file  = userData.profile
    const formdata = new FormData();
    formdata.append('image' , file)
    formdata.append('userData' , JSON.stringify(userData))
    axios
      .post("http://localhost:4000/api/sign-up", formdata)
      .then((response) => {
        dispatch(
          {
            type: SET_LOGIN_CREDENTIALS,
            payload: {
              name: userData?.firstName + " " + userData?.lastName,
              email: userData?.email,
              password: userData?.password,
            },
          },
          navigate("/register-in-space")
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const validationCheck = () => {
  //   const existingEmail = userDetails?.userDetails?.filter(
  //     (e, i) => e.email === userData?.email
  //   );
  //   if (userData?.email.includes("@") && !existingEmail?.length) {
  //     submitDetails();
  //   } else if (existingEmail?.length) {
  //     setValidationError({
  //       isExistingEmail: true,
  //     });
  //   } else {
  //     setValidationError({
  //       status: true,
  //     });
  //   }
  // };
  const isInValid = () => {
    setValidationError({
      status: true,
    });
  };
  const isExistingEmail = () => {
    setValidationError({
      isExistingEmail: true,
    });
  };
  const onFinish = (values) => {
    console.log(redux);
    validationCheck(
      userDetails,
      userData,
      submitDetails,
      isExistingEmail,
      isInValid
    );
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
                  placeholder="Mobile Number"
                  onChange={(event) => {
                    onChangeData("mobile", event?.target?.value);
                  }}
                />
              </Form.Item>
            )}

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
                onChange={(event) => {
                  onChangeData("password", event?.target?.value);
                }}
              />
            </Form.Item>

            {/* <Form.Item
              label="Profile Pickture"
              name="profile"
              
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item> */}

            
            <Form.Item
              label="Profile "
              name="profile"
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
    </>
  );
};

export default Signup;
