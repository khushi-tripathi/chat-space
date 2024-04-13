import { useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import { Tabs } from "antd";

import "../styles/page-layout.scss"

import { AndroidOutlined } from "@ant-design/icons";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { fetchGroupInfo, getUuid } from "../Actions/chatManagement";
import { registeredUserDetails } from "../Actions/registeredUserDetails";
import { SET_TAB_DATA } from "../Actions/actionConstant";

const ChatComponent = () => {
  const userDetails = useSelector((state) => state.registeredUserDetails);
  const loginData = useSelector((state) => state.loginDetails)
  const uuidData = useSelector((state) => state.uuid?.uuidData);
  // isGroupDataUpdated
  const groupDetails = useSelector((state) => state?.groupDetails);
  const tabData = useSelector((state) => state?.userTab?.tabData);
  const groupData = useSelector((state) => state?.groupDetails?.groupData);
  const chatArray = useSelector((state) => state.chatManagement?.chatArray);
  const [flag, setFlag] = useState(true)
  const [activeTab, setActiveTab] = useState("own")
  const [mode, setMode] = useState('light')


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(registeredUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(chatArray)
    dispatch(getUuid(loginData, flag, flag === true ? groupData : ''));
    // dispatch(fetchGroupInfo(loginData?.credentials))
    setFlag(false)
  }, [Object.keys(chatArray)?.length]);

  useEffect(() => {
    const allUserTab = userDetails?.userDetails
    const ownTab = allUserTab?.filter((item) => item?.email === loginData?.credentials?.email)
    const otherTab = allUserTab?.filter((item) => item?.email !== loginData?.credentials?.email)
    dispatch({
      type: SET_TAB_DATA,
      payload: {
        tabData: [...ownTab, ...otherTab, ...groupData],
      },
    })
  }, [userDetails?.userDetails?.length, groupData?.length, groupDetails]);



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
    } else if (user?.group_name?.length) {
      return user?.uuid
    }
    else {
      return undefined
    }
  }

  return (
    <div className={mode === 'dark' ? "chat-screen chat-layout-dark" : "chat-screen chat-layout-light"}>
      <Tabs
        onChange={(key) => {
          // console.log(event)
          setActiveTab(key)
        }}
        activeKey={activeTab}
        // defaultActiveKey="0"
        tabPosition="left"
        items={
          userDetails?.isDisplaySelected
            ? tabData?.map((user, i) => {
              const id = String(i + 1);
              return {
                label: <Profile user={user} group={user?.group_name} />,
                key: loginData?.credentials?.email === user?.email ? "own" : id,
                children: <Chat data={`Content of tab ${user?.email} \n `} currentUuid={getCurrentUuid(user)} otherUser={user} group={user?.group_name} userDetails={userDetails?.userDetails} groupData={groupData} mode={mode} setMode={setMode} />,
              };
            })
            : [
              {
                label: <Profile user={loginData?.credentials} />,
                key: "100",
                children: (
                  <Chat data={`No one is there.. you need to search `} otherUser={loginData?.credentials} />
                ),
              },
            ]
        }
      />
    </div>
  )
};

export default ChatComponent;
