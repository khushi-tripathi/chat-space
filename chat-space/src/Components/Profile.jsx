import React from "react";
import "../styles/profile.scss";
import { Button , Col, Row } from "antd";

export default function Profile({ user }) {
  return (
    <Row className="profile">
    <Col span={5}>
    <Button
        className="photo"
        onClick={(event) => {
          alert("HELLO");
          //agr tab uss me switch nhi krvaani h to
          event.stopPropagation();
        }}
      />
    </Col>
    <Col span={19}><div className="name">{user?.first_name + " " + user?.last_name}</div></Col>
  </Row>
    
  );
}
