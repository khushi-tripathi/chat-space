import React from "react";
import "../styles/about.scss"
import "../styles/welcome.scss"
import { Row } from "antd";

export default function About() {
  return (
    <div className="about">
      <h3>Welcome aboard!</h3>
      <Row className="tagline">Get ready to experience seamless and fun conversations like never before.</Row>
      <p className="brief">
        <strong>Chat Space</strong> is here to help you to connect with your favourite ones. Start chatting with friends and family instantly, no matter where they are. Create your groups for family gatherings, work projects, or hobby discussions. Stay connected with everyone in one place. Express yourself with our extensive collection of emojis. There's something for every mood and occasion.
      </p>
      <p className="brief">
        Whether you're reconnecting with old friends or forging new connections, <strong>Chat Space</strong> is here to make every conversation memorable. Dive in, explore our features, and start chatting away. Let's make every moment count!
        We have a lot to describe but we
        want you to experience from your end. So just tight your seat belt and
        get ready to take a look of our chat space..
      </p>
      <Row>HAPPY CHAT!!</Row>
    </div>
  );
}
