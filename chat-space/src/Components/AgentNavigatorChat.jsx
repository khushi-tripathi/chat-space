import { useState } from "react";
import { Card, Input, Button, Row, Col } from "antd";
import ChatMessages from "./ChatMessages";
import "../styles/chat.scss";

// import { SentIcon } from "./ChatHelper";
// import { store } from "../../../../store";
// import { emitChatSocket } from "Hoc/SocketComponent/smallFunction";
let createSession = false;

export const AgentNavigator = () => {
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

  //   let msg = {{} , {}}
  //   const [messageList , setMessage] = useState({
  //     {
  //         key : 1 ,
  //         Message : "Khushi TRipathi" ,
  //         name : "KT" ,
  //       } , {}}
  //    )
  const emitChat = () => {
    // emitChatSocket("chat", {
    //   data: {
    //     // extensionNo: extensionNo,
    //     // agentId: agentID,
    //     // chatSessionId: props.eventInvites?.id,
    //     message: chatData?.newMessage,
    //     agentNameChat: false,
    //     forPrimaryAgent: false,
    //     correlationId:
    //       store.getState()?.agentDetails?.agentDetails?.agentSessionId,
    //     placeId: store.getState()?.session?.user?.params?.placeId || "",
    //   },
    // });
    setChatData({
      ...chatData,
      newMessage: "",
      inputColClasses: "inputBox",
      inputClasses: "input",
      read: Object.values({}).length,
    });
  };
  const send = () => {
    if (chatData?.newMessage.length > 0) {
      const payload = {};
      const id = new Date().toISOString();
      payload[id] = {
        id: id,
        message: chatData?.newMessage,
        time: new Date().toLocaleTimeString("en-US", { hour12: true }),
        sender: "extensionNo",
      };
      setChatMessage({ ...chatMessage, ...payload });

      if (!createSession) {
        setTimeout(emitChat, 1000);
        createSession = true;
      } else {
        emitChat();
      }
    }
  };
  const compareMessageText = (id) => {
    if (id === "extensionNo") {
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
    <>
      <Card title={"Connected"} className="ChatCard">
        <div className="chatBox">
          {/* <ScrollToBottom */}

          {/* ScrollToEnd */}

          <>
            {Object.values(chatMessage).map((item, i) => (
              <ChatMessages
                key={i}
                message={item?.message}
                classs={item?.sender === "extensionNo" ? "right" : "left"}
                time={item?.time}
                lastMessage={
                  i === chatData?.read && compareMessageText(item?.sender)
                    ? true
                    : false
                }
              />
              // <div>"Khushi"</div>
            ))}
          </>
          <Row className="messageInputContainer">
            <Col span={24} className={chatData?.inputColClasses}>
              <Input
                title="Type Message"
                onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
                className={chatData.inputClasses}
                onClick={() => {
                  setChatData({ ...chatData, read: Object.values({}).length });
                }}
                value={chatData?.newMessage}
                onChange={(e) => {
                  setChatData(
                    { ...chatData, newMessage: e.target.value },
                    () => {
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
                    }
                  );
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
    </>
  );
};

export default AgentNavigator;
