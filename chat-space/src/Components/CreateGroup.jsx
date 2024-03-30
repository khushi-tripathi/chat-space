import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addUuid } from '../Actions/uuid';
import { addNewChat, addNewGroup, getUuid } from '../Actions/chatManagement';
import { ADD_NEW_CHAT } from '../Actions/actionConstant';

export default function ModalBox({ setModal, loginData }) {
    const userDetails = useSelector((state) => state.registeredUserDetails);
    const loginDetails = useSelector((state) => state.loginDetails)

    const dispatch = useDispatch()
    const [group, setGroupInfo] = useState({ groupName: '', selectedEmailList: [], firstMsg: '' })
    const handleChange = (value) => {
        debugger
        console.log(`selected ${value}`);
        setGroupInfo({
            ...group,
            selectedEmailList: value
        })
    };


    const setGroupDetails = (value, type) => {
        setGroupInfo({
            ...group,
            [type]: value
        })
    }

    const createGroup = () => {
        const uuid = uuidv4()
        const chat = [
            {
                email: loginData?.email,
                name: loginData?.first_name + " " + loginData?.last_name,
                message: group?.firstMsg?.length ? group?.firstMsg : ('Welcome to the ' + group?.groupName),
                time: new Date().toLocaleTimeString("en-US", { hour12: true }),
                type: "group",
            },
        ]
        const data =
        {
            [uuid]: chat,
        }
        debugger
        dispatch(addUuid(uuid, chat[0]?.email, group?.groupName, true))
        dispatch(addNewChat(data, uuid, chat[0]?.email))
        dispatch(addNewGroup(uuid, chat[0]?.email, group?.selectedEmailList))
        dispatch({
            type: ADD_NEW_CHAT,
            payload: {
                uuid,
                chat,
            }
        });
        debugger
        dispatch(getUuid(loginDetails, true))
        console.log(group)
        setModal(false)
        //yha ab same uuid vaala code copy pase ya function call krege 
    }

    return (
        <Modal
            title={(<h2>Create Group</h2>)}
            centered
            open={true}
            onCancel={() => setModal(false)}
            footer={(_, { CancelBtn }) => (
                <>
                    <Button onClick={createGroup}>Create Group</Button>
                    <CancelBtn />
                </>
            )}

        >

            <h3>Enter Group Name :</h3>
            <Input placeholder="Enter group name" onChange={(event) => { setGroupDetails(event.target.value, 'groupName') }} />
            <h3>Select group member :</h3>
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="select one country"
                defaultValue={[loginData?.email]}
                onChange={handleChange}
                optionLabelProp="label"
                options={
                    userDetails?.isDisplaySelected
                        ? userDetails?.userDetails?.map((user, i) => {
                            const id = String(i);
                            return {
                                label: user?.first_name + " " + user?.last_name,
                                value: user?.email,
                                key: id,
                            };
                        })
                        : [
                            {
                                label: 'No one is there',
                                value: 'No one is there',
                                key: "0",
                            },
                        ]
                }
                optionRender={(option) => (
                    <Space>
                        <span role="img" aria-label={option.data.label}>
                            {/* {option.data.value} */}
                        </span>
                        {option.data.label}
                    </Space>
                )}
            />

            <h3>You can add your first message of the group here :</h3>
            <Input onChange={(event) => { setGroupDetails(event.target.value, 'firstMsg') }} />

        </Modal>
    )
}
