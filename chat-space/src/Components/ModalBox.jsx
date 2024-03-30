import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { Select, Space } from 'antd';
import { useSelector } from 'react-redux';

export default function ModalBox({ setModal, loginData }) {
    const userDetails = useSelector((state) => state.registeredUserDetails);
    const [group, setGroupInfo] = useState({ groupName: '', selectedEmailList: [], firstMsg: '' })
    const handleChange = (value) => {
        debugger
        console.log(`selected ${value}`);
        setGroupInfo({
            ...group,
            selectedEmailList: [...group?.selectedEmailList, value]
        })
    };

    const setGroupDetails = (value, type) => {
        setGroupInfo({
            ...group,
            [type]: value
        })
    }

    const createGroup = () => {

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
