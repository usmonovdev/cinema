import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../context/AuthContext/Firebase'
import { TbLogout } from "react-icons/tb"
import { message } from 'antd'

function SignOut() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const handleSignOut = () => {
        setTimeout(() => {
            signOut(auth).then(() => {
                navigate("/")
            }).catch(() => {
                messageApi.open({
                    type: 'error',
                    content: "Error in sign out!",
                    duration: 5
                });
            });
        }, 800);
    }
    return (
        <div className='signOut'>
            {contextHolder}
            <p>Sign Out</p>
            <TbLogout onClick={handleSignOut} />
        </div>
    )
}

export default SignOut