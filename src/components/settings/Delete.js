import React, { useContext } from 'react'
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { message } from 'antd';

function Delete({ hide }) {
    const { currentUser } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const handleDeleteAccount = () => {
        deleteUser(currentUser).then(() => {
            navigate("/")
        }).catch(() => {
            messageApi.open({
                type: 'error',
                content: "Error!",
                duration: 5
            });
        });
    }
    return (
        <>
            {contextHolder}
            <div className='deletePopover'>
                <button onClick={hide}>Cencel</button>
                <button onClick={handleDeleteAccount}>Delete</button>
            </div>
        </>
    )
}

export default Delete