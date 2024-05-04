import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { submitAdminData } from '../Actions/registeredUserDetails';
import { Button, Modal, Row, Select, Space, Spin, notification } from 'antd';
import "../styles/modal.scss"
import "../styles/button.scss"

export default function AppAdminModal({ setModal, modal }) {
    const [adminInfo, setAdminInfo] = useState({ selectedTable: [] })
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const items = [
        {
            key: '1',
            label: "User Details",
            value: "user_details"
        },
        {
            key: '2',
            label: "UUID Table",
            value: "uuid"
        },
        {
            key: '3',
            label: "Manage Chat",
            value: "manage_chat"
        },
        {
            key: '4',
            label: "Group Information",
            value: "group_chat"
        },
    ]

    const handleChange = (value) => {
        setAdminInfo({
            ...adminInfo,
            selectedTable: value
        })
    };

    const setLoadingStatus = (value) => {
        setLoading(value)
        if (value === false) {
            notification.error({ message: "Error in uploading error" })
        } else {
            setModal({ ...modal, admin: false })
        }
    }

    const submitAdminRequest = () => {
        setLoading(true)
        dispatch(submitAdminData(adminInfo.selectedTable, setLoadingStatus))

    }
    return (
        <Modal
            cancelButtonProps={{ disabled: loading }}
            className='chat-modal'
            title={(<h2>Admin Access</h2>)}
            centered
            open={true}
            onCancel={() => setModal({ ...modal, admin: false })}
            footer={(_, { CancelBtn }) => (
                <>
                    <Button disabled={loading} onClick={submitAdminRequest}>Submit Request</Button>
                    <CancelBtn />
                </>
            )}
        >
            <Spin spinning={loading}>

                <Row className='chat-modal-content'>
                    <h3>Select Database Tables To Delete Corresponding Records :</h3>
                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        placeholder="select table name"

                        onChange={handleChange}
                        optionLabelProp="label"
                        options={
                            items
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
                </Row>
            </Spin>

        </Modal>
    )
}
