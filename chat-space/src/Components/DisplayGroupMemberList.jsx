
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { submitAdminData } from '../Actions/registeredUserDetails';
import { Button, Col, Input, Modal, Row, Select, Space } from 'antd';

export default function DisplayGroupMemberList({ setModal, loginData, modal, user, groupData }) {


    const [adminInfo, setAdminInfo] = useState({ selectedTable: [] })
    const dispatch = useDispatch()

    return (
        <Modal
            className='member-list'
            title={(<h2> -- Group Member -- </h2>)}
            centered
            open={true}
            onCancel={() => setModal({ ...modal, showGroupMember: false })}
            footer={(_, { CancelBtn }) => (
                <>
                    <CancelBtn />
                </>
            )}
        >
            {
                // user?.group_member
                // Array.from(Array(10).keys())
                user?.group_member?.map((item, i) => {
                    const admin = user?.admin?.filter((adm) => adm === item)
                    return (<Row className=''>
                        <Col span={12}>
                            {item}
                        </Col>
                        <Col span={12}>
                            {admin?.length ? "admin" : "only member"}
                        </Col>
                    </Row>)
                })
            }




        </Modal>
    )
}
