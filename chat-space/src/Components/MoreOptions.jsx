import React, { useState } from 'react'

import { MenuOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Row, Space, Switch, Tooltip } from 'antd';
import Profile from './Profile';
// Edit Profile  --- own 
// Create Group
// Delete Chat History
// Set Status  --own 
// Select Theme
// Block this chat 
// Logout
export default function MoreOptions({ loginData }) {

    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };

    const items = [

        {
            key: '1',
            label: "Create Group"
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

    const profileItems = [
        {
            key: '11',
            label: "Edit Profile"
        },
        {
            key: '12',
            label: "Set Status"
        },
        {
            key: '13',
            label: 'Delete Chat History For Every Chat'
        },
        {
            key: '14',
            label: 'Logout',
        },
    ];

    const handleButtonClick = (e) => {
        // message.info('Click on left button.');
        console.log('click left button', e);
    };
    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
        console.log('click', e);
    };


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

            <Tooltip title="Profile">

                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: profileItems,
                    }} >
                    <Button
                        className="photo"
                        onClick={(event) => {
                            //that will stop to switch tab when anyone clicks to profile picture
                            event.stopPropagation();
                        }}
                    >
                        <Image
                            src={loginData?.profile_image}
                            preview={false}
                            about='Hello'

                        />
                    </Button>
                </Dropdown>
            </Tooltip>

            {/* <Profile user={loginData} onlyImage={true} /> */}


        </Row >
    )
}
