import { useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Tabs } from "antd";

import { AndroidOutlined } from "@ant-design/icons";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { getUuid } from "../Actions/chatManagement";
import registeredUserDetails from "../Actions/registeredUserDetails";

const ChatComponent = () => {
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const loginData = useSelector((state) => state.loginDetails)
  const uuidData = useSelector((state) => state.uuid?.uuidData);
  const chatArray = useSelector((state) => state.chatManagement?.chatArray);
  const [flag, setFlag] = useState(true)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(registeredUserDetails());
    // dispatch(getUuid(loginData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);

  useEffect(() => {
    console.log(chatArray)
    dispatch(getUuid(loginData, flag));
    setFlag(false)
  }, [Object.keys(chatArray)?.length]);



  const getCurrentUuid = (user) => {
    const currentUuid = uuidData?.filter((item) => ((item?.other_user === loginData?.credentials?.email ||
      item?.other_user === user?.email) &&
      (item?.primary_user === loginData?.credentials?.email || item?.primary_user === user?.email) &&
      (item?.other_user !== item?.primary_user)))

    const ownUuid = uuidData?.filter((item) => (item?.other_user === user?.email) &&
      (user?.email === item?.primary_user))

    if (ownUuid?.length) {
      return ownUuid[0]?.uuid
    } else if (currentUuid?.length) {
      return currentUuid[0]?.uuid
    }
    else {
      return undefined
    }
  }

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
                children: <Chat data={`Content of tab ${user?.email} \n `} currentUuid={getCurrentUuid(user)} otherUser={user} />,
                // icon: (
                //   <AndroidOutlined
                //     onClick={() => {
                //       alert("KKK TT");
                //     }}
                //   />
                // ),
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
  )
};

export default ChatComponent;
