import React, { useState, useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Card, Input, Button, Row, Col } from "antd";
import ChatMessages from "./ChatMessages";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { ADD_NEW_CHAT, SET_CHAT_MESSAGES } from "../Actions/actionConstant";
import { updateChatData, addNewChat } from "../Actions/chatManagement";
import { addUuid } from "../Actions/uuid";
import { SendOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Picker, { Emoji } from 'emoji-picker-react';
import MoreOptions from "./MoreOptions";

export default function Chat({ currentUuid, otherUser }) {
  const inputRef = useRef();
  const loginData = useSelector((state) => state.loginDetails);

  const uuidData = useSelector((state) => state.uuid?.uuidData);
  const chatArray = useSelector((state) => state.chatManagement?.chatArray);
  const dispatch = useDispatch()

  const [emojiHandler, setEmojiHandler] = useState({ open: false });




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
      const chat = [
        {
          email: loginData?.credentials?.email,
          name: loginData?.credentials?.first_name + " " + loginData?.credentials?.last_name,
          message: chatData?.newMessage,
          time: new Date().toLocaleTimeString("en-US", { hour12: true }),
          type: "oneToOne",
        },
      ]
      const uuid = uuidv4();
      if (!Object.keys(chatArray).filter((item) => item === currentUuid)?.length) {
        const data =
        {
          [uuid]: chat,
        }
        dispatch(addUuid(uuid, chat[0]?.email, otherUser?.email, false))
        dispatch(addNewChat(data, uuid, chat[0]?.email))
        dispatch({
          type: ADD_NEW_CHAT,
          payload: {
            uuid,
            chat,
          }
        });
      }
      else {
        const chatData = {
          [currentUuid]: [
            ...chatArray?.[currentUuid],
            chat[0],
          ],
        }
        dispatch(updateChatData(chatData, currentUuid, chat[0]?.email))
        dispatch({
          type: SET_CHAT_MESSAGES,
          payload: {
            idx: currentUuid,
            message: chat[0]
          }
        });

      }
      socketEmit("chat", {
        message: inputRef?.current?.input?.value,
        email: loginData?.credentials?.email,
        chat: { ...chat[0] },
        uuid: currentUuid || uuid,
        otherUser: otherUser?.email || ""
      });
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

  const onClickEmoji = (data) => {
    console.log(data)
    console.log(chatData)
    console.log(inputRef?.current?.input?.value)
    setChatData({ ...chatData, newMessage: (inputRef?.current?.input?.value + data?.emoji) });
  }
  return (
    <Card title={otherUser?.first_name + " " + otherUser?.last_name} className="ChatCard" extra={<MoreOptions loginData={loginData?.credentials} />
    }>
      <div className="chatBox">
        <ScrollToBottom
          className="chatContainer"
          initialScrollBehavior="smooth"
          mode="bottom"
        >
          {/* {console.log("Khushi : ", chatArray[currentUuid])} */}
          {currentUuid && chatArray[currentUuid]?.map((item, i) => (
            <ChatMessages
              key={i}
              message={item?.message}
              classs={
                item?.email === loginData?.credentials?.email
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
                setChatData({ ...chatData, newMessage: e.target.value });
              }}
            />
            <Button onClick={() => {
              setEmojiHandler({ open: !emojiHandler?.open })
              setChatData({ ...chatData, inputColClasses: !emojiHandler?.open ? 'inputBox changedPositionInputBox' : 'inputBox' })
            }}>
              <PlusCircleOutlined />
            </Button>
            <Button
              title="Send Message Button"
              onClick={send}
              className="sendBtn"
            >
              <SendOutlined />
            </Button>
          </Col>
          {emojiHandler?.open && <Picker onEmojiClick={onClickEmoji} className="emoji-picker" searchDisabled={true} suggestedEmojisMode={'frequent'} previewConfig={{
            defaultEmoji: "1f60a", // defaults to: "1f60a"
            defaultCaption: "", // defaults to: "What's your mood?"
            showPreview: false // defaults to: true
          }} />}
        </Row>
      </div>
    </Card>
  );
}
