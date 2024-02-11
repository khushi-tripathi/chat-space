import { useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Tabs } from "antd";

import { AndroidOutlined } from "@ant-design/icons";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Chat from "./Chat";

const ChatComponent = () => {
  const userDetails = useSelector(
    (state) => state.registeredUserDetails?.userDetails
  );
  return (
    <div className="chat-screen">
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={
          userDetails?.isDisplaySelected
            ? userDetails.map((user, i) => {
                const id = String(i);
                return {
                  label: <Profile />,
                  key: id,
                  disabled: i === 28,
                  children: <Chat data={`Content of tab ${user?.email} \n `} />,
                  icon: (
                    <AndroidOutlined
                      onClick={() => {
                        alert("KKK TT");
                      }}
                    />
                  ),
                };
              })
            : [
                {
                  label: <Profile />,
                  key: "0",
                  children: (
                    <Chat data={`No one is there.. you need to search `} />
                  ),
                  icon: (
                    <AndroidOutlined
                      onClick={() => {
                        alert("KKK TT");
                      }}
                    />
                  ),
                },
              ]
        }
      />
    </div>
  );
};

export default ChatComponent;
