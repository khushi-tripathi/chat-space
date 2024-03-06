import { useEffect, useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Tabs } from "antd";

import { AndroidOutlined } from "@ant-design/icons";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import getUuid from "../Actions/chatManagement";
import registeredUserDetails from "../Actions/registeredUserDetails";

const ChatComponent = () => {
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const loginData = useSelector((state) => state.loginDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(registeredUserDetails());
    dispatch(getUuid(loginData));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-screen">
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={
          userDetails?.isDisplaySelected
            ? userDetails?.userDetails?.map((user, i) => {
                const id = String(i);
                return {
                  label: <Profile user={user} />,
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
