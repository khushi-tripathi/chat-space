import React from 'react'
import { Button, Dropdown, Image, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_DEFAULT_VALUE } from '../Actions/actionConstant';

export default function ProfileOptionDropdown({ loginData }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: SET_DEFAULT_VALUE
        })
        navigate('/')
    }
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
            label: (<div onClick={logout}>Logout</div>),
        },
    ];

    return (
        <div>
            <Tooltip title="Profile">

                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: profileItems,
                        onChange: (event) => {
                        }
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
        </div>
    )
}
