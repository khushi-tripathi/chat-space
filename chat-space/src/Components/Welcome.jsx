import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registeredUserDetails } from "../Actions/registeredUserDetails";
import "../styles/welcome.scss"
import "../styles/page-layout.scss"
import "../styles/button.scss"

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registeredUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="welcome page-layout">
      <Row
        className="box box-layout">
        <Row className="app-name">
          Chat Space
        </Row>
        <Row className="tagline">
          Stay Connected, Anywhere, Anytime: Your Ultimate Chat Companion
        </Row>
        <Row className="brief">
          <p>
            Welcome to <strong>Chat Space</strong>, your go-to destination for seamless communication. Whether you're connecting with friends, family, or colleagues, our intuitive platform ensures smooth conversations anytime, anywhere. With robust features, including secure messaging, customizable group chats, and effortless file sharing, staying in touch has never been easier. Join our vibrant community and experience the future of communication today.
          </p>
        </Row>
        <Row className="button-section">
          <Button className="sign" onClick={() => navigate("/sign-up")}>Sign Up</Button>
          <Button className="login" onClick={() => navigate("/login")}>Login</Button>
        </Row>
      </Row>
    </div>
  );
}
