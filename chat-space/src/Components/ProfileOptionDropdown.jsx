import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Image, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_DEFAULT_VALUE } from '../Actions/actionConstant';
import AppAdminModal from './AppAdminModal';
import "../styles/dropdown.scss"

export default function ProfileOptionDropdown({ loginData }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modal, setModal] = useState({ admin: false })
    const logout = () => {
        dispatch({
            type: SET_DEFAULT_VALUE
        })
        navigate('/')
    }
    const [profileItems, setProfileItems] = useState([
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
    ])

    const deleteTable = () => {
        setModal({ admin: true })
    }

    useEffect(() => {
        if (loginData?.email === process.env?.REACT_APP_ADMIN_EMAIL) {
            setProfileItems([{
                key: profileItems?.length + 1,
                label: (<div onClick={deleteTable}>Delete Database Tables</div>)
            }, ...profileItems])
        }
    }, [])



    return (
        <div >
            <Tooltip title="Profile">
                <Dropdown
                    overlayClassName='chat-dropdown'
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

            {modal?.admin && <AppAdminModal modal={modal} setModal={setModal} />}
        </div>
    )
}
