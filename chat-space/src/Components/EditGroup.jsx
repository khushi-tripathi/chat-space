import { Button, Image, Input, Modal, Row, Select, Space } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUuid } from '../Actions/uuid';
import { addNewChat, addNewGroup, editGroupInfo, getUuid } from '../Actions/chatManagement';
import { ADD_NEW_CHAT } from '../Actions/actionConstant';
import "../styles/modal.scss"
import "../styles/button.scss"


export default function EditGroup({ setModal, loginData, modal, user, groupData }) {

    const userDetails = useSelector((state) => state.registeredUserDetails);
    const loginDetails = useSelector((state) => state.loginDetails)

    const dispatch = useDispatch()
    const [group, setGroupInfo] = useState({ groupName: '', selectedEmailList: [], firstMsg: '', groupAdmin: [], groupPic: '' })
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

    const getImage = (type, file) => {
        //convert to Base64
        var reader = new FileReader();
        reader?.readAsDataURL(file)
        reader.onload = () => {
            // reader?.result -- base64encoded string 
            setGroupDetails(reader.result, type)
        }
        reader.onerror = (error) => {
            console.log("Error : ", error)
        }
    }

    const updateGroupInfo = () => {
        const group_picture = group?.groupPic?.length ? group?.groupPic : user?.group_picture
        const selectedEmailList = group?.selectedEmailList?.length ? group?.selectedEmailList : user?.group_member
        const groupName = group?.groupName?.length ? group?.groupName : user?.group_name
        const groupAdmin = group?.groupAdmin?.length ? group?.groupAdmin : user?.admin

        dispatch(editGroupInfo(user?.uuid, selectedEmailList, groupName, groupAdmin, group_picture))
        dispatch(getUuid(loginDetails, true, groupData))
        setModal({ ...modal, editGroup: false })
    }

    return (
        <Modal
            className='chat-modal'
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
            <Row className='chat-modal-content'>


                <h3>Edit Group Name :</h3>
                <Input defaultValue={user?.group_name} placeholder="Edit group name here - " onChange={(event) => { setGroupDetails(event.target.value, 'groupName') }} />
                <h3>Edit Group Member :</h3>
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

                <h3>Select Group Admin :</h3>
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


                {user?.group_picture?.length ? (
                    <h3>Current Group Profile Picture :</h3>
                ) : null}

                {user?.group_picture?.length ? (
                    <Image
                        src={user?.group_picture}
                        preview={false}
                        about='Hello'

                    />
                ) : null}


                <h3>Edit Group Profile Picture Here :</h3>
                <input
                    type="file"
                    className="sign-up-input"
                    onChange={(event) => {
                        getImage("groupPic", event?.target?.files[0]);
                    }}
                />

            </Row>


        </Modal>
    )
}
