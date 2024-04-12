import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { submitAdminData } from '../Actions/registeredUserDetails';
import { Button, Input, Modal, Row, Select, Space } from 'antd';
import "../styles/modal.scss"
import "../styles/button.scss"

export default function AppAdminModal({ setModal, modal }) {

    const [adminInfo, setAdminInfo] = useState({ selectedTable: [] })
    const dispatch = useDispatch()


    // frontend pr env me store krne ki jarurt nhi h yha se bs name bhejdo ormal 
    //backend se uss name ko integrate krenge backend table ke saath and 
    // vha pr table ko env me store krro and then jha jha use horha h table ka naam vha pr variable daal do 
    // uske baad end to end test krlo admin vaali functionality 

    // uske baad create group and edit group me profile picture vaala option dedo 

    //uske baad radio button vaali cheez krdo // radio button inegration  -- sign up 

    //by default tab should open own chat and that should be placed on first nuber in the chat section. 

    // list render krni h -- group me jitne log h unki with admin status 


    // Above DONE

    // *****

    // overall color and theme  -- (theme redux ke thorough bhi manage kr skte h baaki subh dekhte h )
    // overall responsive ness 
    // iske baad dark light theme aaega landing page of chat ka 
    // then overall conetnt check out krlo sb thik chlrha ya nhi padhne me 


    // then we are good to go for the deployment.... 

    // Try to do all of the things except color theme... 3-April 

    // 4- april ko deplpyment krna h 




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
        console.log(`selected ${value}`);
        setAdminInfo({
            ...adminInfo,
            selectedTable: value
        })
    };

    const submitAdminRequest = () => {
        //api call 
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
