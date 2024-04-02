import React, { useState } from 'react'

import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Row, Space, Switch } from 'antd';
import ProfileOptionDropdown from './ProfileOptionDropdown';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
// Edit Profile  --- own 
// Create Group
// Delete Chat History
// Set Status  --own 
// Select Theme
// Block this chat 
// Logout


// View Group member list 
// MAke admin or by default creater is the only admin 
export default function MoreOptions({ loginData, group, user, groupData }) {

    const [modal, setModal] = useState({ createGroup: false, editGroup: false });

    const onClickCreateGroupBtn = () => {
        setModal({ ...modal, createGroup: true })
    }

    const editGroupInfo = () => {
        setModal({ ...modal, editGroup: true })
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

    const [theme, setTheme] = useState('dark');



    // useEffect(() => {
    //   setItems([
    //     ...item,
    //     {
    //         key: item[item?.length +1],
    //         label: "Edit "
    //     }
    //   ])


    // }, [group?.length])

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
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
            <ProfileOptionDropdown loginData={loginData} />
            {modal?.createGroup && <CreateGroup setModal={setModal} loginData={loginData} modal={modal} />}
            {modal?.editGroup && <EditGroup user={user} setModal={setModal} loginData={loginData} modal={modal} groupData={groupData} />}
        </Row >
    )
}