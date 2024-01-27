import React from "react";
import "../styles/sign-up.scss";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const submitDetails = () => {
    debugger;
    navigate("/chat");
    // redirect("/chat");
  };
  return (
    <div className="sign-up">
      <div className="sign-up-content">
        <h3>Welcome to the CHAT SPACE</h3>
        <h4>Sign Up / Login</h4>
        <Input
          className="sign-up-input"
          placeholder="First Name"
          prefix={<UserOutlined />}
        />
        <Input
          className="sign-up-input"
          placeholder="Last Name"
          prefix={<UserOutlined />}
        />
        <Input
          className="sign-up-input"
          placeholder="Email Address"
          prefix={<MailOutlined />}
        />
        <Input
          className="sign-up-input"
          placeholder="Mobile Number"
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
