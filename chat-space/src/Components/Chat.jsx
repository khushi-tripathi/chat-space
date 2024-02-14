import React, { useState, useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Card, Input, Button, Row, Col } from "antd";
import ChatMessages from "./ChatMessages";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
export default function Chat({}) {
  const inputRef = useRef();
  const loginData = useSelector((state) => state.loginDetails);

  const [data, setData] = useState([
    {
      index: 0,
      content: "Khushi",
    },
  ]);

  const [chatData, setChatData] = useState({
    agentID: "",
    extensionNo: "",
    name: "",
    newMessage: "",
    inputClasses: "input",
    inputColClasses: "inputBox",
    read: 0,
  });
  const [chatMessage, setChatMessage] = useState({});

  const send = () => {
    debugger;
    socketEmit("chat", {
      message: inputRef?.current?.input?.value,
      email: loginData?.credentials?.email,
    });
    if (chatData?.newMessage.length > 0) {
      const payload = {};
      const id = new Date().toISOString();
      payload[id] = {
        id: id,
        message: chatData?.newMessage,
        time: new Date().toLocaleTimeString("en-US", { hour12: true }),
        sender: loginData?.credentials?.email,
      };
      setChatMessage({ ...chatMessage, ...payload });
    }
  };
  const compareMessageText = (id) => {
    if (id === loginData?.credentials?.email) {
      // setChatData({
      //   ...chatData,
      //   read: Object.values({
      //     //jitne mesage ho uska cout aaega yha pr
      //   }).length,
      // });
    }
    return true;
  };
  return (
    <Card title={"Connected"} className="ChatCard">
      <div className="chatBox">
        <ScrollToBottom
          className="chatContainer"
          initialScrollBehavior="smooth"
          mode="bottom"
        >
          {Object.values(chatMessage).map((item, i) => (
            <ChatMessages
              key={i}
              message={item?.message}
              classs={
                item?.sender === loginData?.credentials?.email
                  ? "right"
                  : "left"
              }
              time={item?.time}
              lastMessage={
                i === chatData?.read && compareMessageText(item?.sender)
                  ? true
                  : false
              }
            />
          ))}
        </ScrollToBottom>
        <Row className="messageInputContainer">
          <Col span={24} className={chatData?.inputColClasses}>
            <Input
              ref={inputRef}
              title="Type Message"
              onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
              className={chatData.inputClasses}
              onClick={() => {
                setChatData({ ...chatData, read: Object.values({}).length });
              }}
              value={chatData?.newMessage}
              onChange={(e) => {
                setChatData({ ...chatData, newMessage: e.target.value }, () => {
                  if (chatData?.newMessage.trim().length > 0) {
                    setChatData({
                      ...chatData,
                      inputClasses: "input onChangeInputBox",
                      inputColClasses: "inputBox onChangeInputBox",
                    });
                  } else {
                    setChatData({
                      ...chatData,
                      inputColClasses: "inputBox",
                      inputClasses: "input",
                    });
                  }
                });
              }}
            />

            <Button
              title="Send Message Button"
              onClick={send}
              className="sendBtn"
            >
              Send
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
