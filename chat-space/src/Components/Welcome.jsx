import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registeredUserDetails } from "../Actions/registeredUserDetails";
import "../styles/welcome.scss"
import "../styles/page-layout.scss"

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
        <Row>
          WELCOME TO CHAT-SPACE!!

        </Row>
        <Row className="button-section">
          {/* <Row> */}
          <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
          {/* </Row> */}
        </Row>
      </Row>
    </div>
  );
}
