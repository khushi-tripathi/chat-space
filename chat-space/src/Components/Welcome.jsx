import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import registeredUserDetails from "../Actions/registeredUserDetails";

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registeredUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      WELCOME TO CHAT-SPACE!!
      <Col>
        <Row>
          <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Row>
      </Col>
    </div>
  );
}
