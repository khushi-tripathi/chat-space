import React from "react";
import "../styles/profile.scss";
import { Button } from "antd";

export default function Profile({ user }) {
  return (
    <div className="profile">
      <Button
        className="photo"
        onClick={(event) => {
          alert("HELLO");
          //agr tab uss me switch nhi krvaani h to
          // event.stopPropagation();
        }}
      >
        KT
      </Button>
      <div className="name">{user?.first_name + " " + user?.last_name}</div>
    </div>
  );
}
