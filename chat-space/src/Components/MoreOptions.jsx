import React, { useState } from 'react'

import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Row, Space, Switch } from 'antd';
import ProfileOptionDropdown from './ProfileOptionDropdown';
import CreateGroup from './CreateGroup';
// Edit Profile  --- own 
// Create Group
// Delete Chat History
// Set Status  --own 
// Select Theme
// Block this chat 
// Logout


// View Group member list 
// MAke admin or by default creater is the only admin 
export default function MoreOptions({ loginData }) {

    const [theme, setTheme] = useState('dark');
    const [modal, setModal] = useState(false);
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };

    const onClickCreateGroupBtn = () => {
        setModal(true)
    }
    const items = [

        {
            key: '1',
            label: (<div onClick={onClickCreateGroupBtn}>Create Group</div>)
        },
        {
            key: '2',
            label: 'Block'
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

    return (
        <Row>
            <Dropdown
                trigger={['click']}
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        More
                        <MenuOutlined />
                    </Space>




                </a>
            </Dropdown>
            <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <ProfileOptionDropdown loginData={loginData} />
            {modal && <CreateGroup setModal={setModal} loginData={loginData} />}
        </Row >
    )
}
