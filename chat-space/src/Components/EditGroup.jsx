import { Button, Input, Modal, Select, Space } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUuid } from '../Actions/uuid';
import { addNewChat, addNewGroup, editGroupInfo, getUuid } from '../Actions/chatManagement';
import { ADD_NEW_CHAT } from '../Actions/actionConstant';

export default function EditGroup({ setModal, loginData, modal, user, groupData }) {

    const userDetails = useSelector((state) => state.registeredUserDetails);
    const loginDetails = useSelector((state) => state.loginDetails)

    const dispatch = useDispatch()
    const [group, setGroupInfo] = useState({ groupName: '', selectedEmailList: [], firstMsg: '', groupAdmin: [] })
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setGroupInfo({
            ...group,
            selectedEmailList: value
        })
    };

    const handleAdminChange = (value) => {
        console.log(`selected ${value}`);
        setGroupInfo({
            ...group,
            groupAdmin: value
        })
    };



    const setGroupDetails = (value, type) => {
        setGroupInfo({
            ...group,
            [type]: value
        })
    }

    const updateGroupInfo = () => {
        dispatch(editGroupInfo(user?.uuid, group?.selectedEmailList, group?.groupName, group?.groupAdmin))
        dispatch(getUuid(loginDetails, true, groupData))
        setModal({ ...modal, editGroup: false })
    }

    return (
        <Modal
            title={(<h2>Edit Group Information</h2>)}
            centered
            open={true}
            onCancel={() => setModal({ ...modal, editGroup: false })}
            footer={(_, { CancelBtn }) => (
                <>
                    <Button onClick={updateGroupInfo}>Update Group</Button>
                    <CancelBtn />
                </>
            )}

        >

            <h3>Enter Group Name :</h3>
            <Input defaultValue={user?.group_name} placeholder="Edit group name here - " onChange={(event) => { setGroupDetails(event.target.value, 'groupName') }} />
            <h3>Select group member :</h3>
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="select group member -- "
                defaultValue={user?.group_member}
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

            <h3>Select group admin :</h3>
            <Select
                mode="multiple"
                style={{
                    width: '100%',
                }}
                placeholder="select group admin"
                defaultValue={user?.admin}
                onChange={handleAdminChange}
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

        </Modal>
    )
}
