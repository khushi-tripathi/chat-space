
import React from 'react'
import { Col, Modal, Row } from 'antd';
import "../styles/modal.scss"

export default function DisplayGroupMemberList({ setModal, loginData, modal, user, groupData }) {
    return (
        <Modal
            className='member-list chat-modal'
            title={(<h2>Group Members</h2>)}
            centered
            open={true}
            onCancel={() => setModal({ ...modal, showGroupMember: false })}
            footer={(_, { CancelBtn }) => (
                <>
                    <CancelBtn />
                </>
            )}
        >
            <Row className='member-content'>
                <Row className='member-list-label'>
                    <Col span={12}>
                        Name
                    </Col>
                    <Col span={12}>
                        Role
                    </Col>
                </Row>
                <Row className='render-list'>
                    {
                        // user?.group_member
                        // Array.from(Array(10).keys())
                        user?.group_member?.map((item, i) => {
                            const admin = user?.admin?.filter((adm) => adm === item)
                            return (<Row className='list'>
                                <Col span={12} className='name'>
                                    {item}
                                </Col>
                                <Col span={12} className='role'>
                                    {admin?.length ? "admin" : "only member"}
                                </Col>
                            </Row>)
                        })
                    }
                </Row>
            </Row>
        </Modal>
    )
}
