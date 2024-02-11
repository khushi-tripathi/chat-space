import { Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  // const onChangePage = (type) => {
  //     setPageType({
  //       page: type === "sign" ? "signUp" : "login",
  //     });
  //   };
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
