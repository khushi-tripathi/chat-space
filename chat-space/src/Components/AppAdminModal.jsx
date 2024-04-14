import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { submitAdminData } from '../Actions/registeredUserDetails';
import { Button, Modal, Row, Select, Space } from 'antd';
import "../styles/modal.scss"
import "../styles/button.scss"

export default function AppAdminModal({ setModal, modal }) {
    const [adminInfo, setAdminInfo] = useState({ selectedTable: [] })
    const dispatch = useDispatch()
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

    const submitAdminRequest = () => {
        dispatch(submitAdminData(adminInfo.selectedTable))
        setModal({ ...modal, admin: false })
    }
    return (
        <Modal
            className='chat-modal'
            title={(<h2>Admin Access</h2>)}
            centered
            open={true}
            onCancel={() => setModal({ ...modal, admin: false })}
            footer={(_, { CancelBtn }) => (
                <>
                    <Button onClick={submitAdminRequest}>Submit Request</Button>
                    <CancelBtn />
                </>
            )}
        >
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
        </Modal>
    )
}
