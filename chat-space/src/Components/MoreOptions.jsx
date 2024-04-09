import React, { useEffect, useState } from 'react'

import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Row, Space, Switch } from 'antd';
import ProfileOptionDropdown from './ProfileOptionDropdown';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import DisplayGroupMemberList from './DisplayGroupMemberList';
import "../styles/dropdown.scss"
// Edit Profile  --- own 
// Create Group
// Delete Chat History
// Set Status  --own 
// Select Theme
// Block this chat 
// Logout


// View Group member list 
// MAke admin or by default creater is the only admin 
export default function MoreOptions({ loginData, group, user, groupData, mode, setMode }) {

    const [modal, setModal] = useState({ createGroup: false, editGroup: false, showGroupMember: false });

    const onClickCreateGroupBtn = () => {
        setModal({ ...modal, createGroup: true })
    }

    const editGroupInfo = () => {
        setModal({ ...modal, editGroup: true })
    }

    const showList = () => {
        setModal({ ...modal, showGroupMember: true })
    }

    let item = [
        {
            key: '1',
            label: (<div onClick={onClickCreateGroupBtn}>Create Group</div>)
        },
        {
            key: '2',
            label: group?.length ? (<div onClick={editGroupInfo}>Edit Group Information</div>) : 'Block'
        },
        {
            key: '3',
            label: 'Delete Chat History',
        },
        {
            key: '4',
            label: "Select Chat Theme"
        },
    ];

    const [items, setItems] = useState(item);

    // const [theme, setTheme] = useState('light');



    useEffect(() => {

        if (group?.length) {
            setItems([
                ...item,
                {
                    key: item[item?.length + 1],
                    label: (<div onClick={showList}>Show All Group Members</div>)
                }
            ])
        }



    }, [])

    const changeMode = (value) => {
        setMode(value ? 'dark' : 'light');
    };





    return (
        <Row >
            < Dropdown
                overlayClassName='chat-dropdown'
                trigger={['click']}
                menu={{
                    items,
                }
                }
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        More
                        <MenuOutlined />
                    </Space>




                </a>
            </Dropdown >
            <Switch
                checked={mode === 'dark'}
                onChange={changeMode}
                checkedChildren="Light"
                unCheckedChildren="Dark"
            />
            <ProfileOptionDropdown loginData={loginData} />
            {modal?.createGroup && <CreateGroup setModal={setModal} loginData={loginData} modal={modal} />}
            {modal?.editGroup && <EditGroup user={user} setModal={setModal} loginData={loginData} modal={modal} groupData={groupData} />}
            {modal?.showGroupMember && <DisplayGroupMemberList user={user} setModal={setModal} loginData={loginData} modal={modal} groupData={groupData} />}

        </Row >
    )
}
