import { useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Tabs } from "antd";

import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Profile from "./Profile";

const Chat = () => {
  const inputRef = useRef();
  return (
    <div className="chat-screen">
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: <Profile />,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id} \n `,
            icon: (
              <AndroidOutlined
                onClick={() => {
                  alert("KKK TT");
                }}
              />
            ),
          };
        })}
      />

      {/* <input ref={inputRef} />
      <button
        onClick={() => socketEmit("chat", { message: inputRef.current.value })}
      >
        Chat
      </button> */}
    </div>
  );
};

export default Chat;
