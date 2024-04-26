import { Button, Image, Input, Modal, Row, Select, Space, Spin, notification } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editGroupInfo, getUuid } from '../Actions/chatManagement';
import "../styles/modal.scss"
import "../styles/button.scss"

export default function EditGroup({ setModal, loginData, modal, user, groupData }) {
    const [loading, setLoading] = useState(false)

    const userDetails = useSelector((state) => state.registeredUserDetails);
    const loginDetails = useSelector((state) => state.loginDetails)

    const dispatch = useDispatch()
    const [group, setGroupInfo] = useState({ groupName: '', selectedEmailList: [], firstMsg: '', groupAdmin: [], groupPic: '' })
    const handleChange = (value) => {
        setGroupInfo({
            ...group,
            selectedEmailList: value
        })
    };

    const setLoadingStatus = (value) => {
        setLoading(value)
        if (value === false) {
            notification.error("Error in uploading error")
        } else {
            dispatch(getUuid(loginDetails, true, groupData))
            setModal({ ...modal, editGroup: false })
        }
    }

    const handleAdminChange = (value) => {
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
        debugger
        setLoading(true)
        const group_picture = typeof (group?.groupPic) === 'string' ? user?.group_picture : group?.groupPic
        const selectedEmailList = group?.selectedEmailList?.length ? group?.selectedEmailList : user?.group_member
        const groupName = group?.groupName?.length ? group?.groupName : user?.group_name
        const groupAdmin = group?.groupAdmin?.length ? group?.groupAdmin : user?.admin
        dispatch(editGroupInfo(user?.uuid, selectedEmailList, groupName, groupAdmin, group_picture, setLoadingStatus))

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
                    <Button disabled={loading} onClick={updateGroupInfo}>Update Group</Button>
                    <CancelBtn disabled={loading} />
                </>
            )}
        >
            <Spin spinning={loading}>
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
                            setGroupDetails(event?.target?.files[0], "groupPic");
                        }}
                    />
                </Row>
            </Spin>
        </Modal>
    )
}
