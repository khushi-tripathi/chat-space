import React from "react";
import "../styles/sign-up.scss";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const onChangeData = (type, value) => {
    setUserData({
      ...userData,
      [type]: value,
    });
    console.log("userData", userData);
  };
  const submitDetails = () => {
    axios
      .post("http://localhost:4000/api/sign-up", userData)
      .then((response) => {
        console.log("Khushi", response);
        navigate("/chat");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="sign-up">
      <div className="sign-up-content">
        <h3>Welcome to the CHAT SPACE</h3>
        <h4>Sign Up / Login</h4>
        <Input
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
        />
        <Button
          className="basic-properties sign-up-button"
          type="submit"
          onClick={submitDetails}
        >
          GOOD TO GO!!
        </Button>
      </div>
    </div>
  );
};

export default Signup;
