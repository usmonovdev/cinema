import React, { useState, useContext } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { updateEmail } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db } from '../../context/AuthContext/Firebase'
import { message } from 'antd'

function Email() {
    const [messageApi, contextHolder] = message.useMessage();
    const { currentUser } = useContext(AuthContext)
    const [newEmail, setNewEmail] = useState("")
    const [lastName, setLastName] = useState(currentUser.displayName)

    setInterval(() => {
        setLastName(currentUser.email)
    }, 1000);

    const handleChangeName = () => {
        if (newEmail.length > "6") {
            updateEmail(currentUser, newEmail).then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Email updated successful!',
                    duration: 5
                });
            }).catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: `Error! ${error.code?.slice(5).replaceAll("-", " ")}`,
                    duration: 5
                });
            });
            setDoc(doc(db, "users", currentUser.uid), {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: newEmail,
                photoURL: currentUser.photoURL,
            });
        } else {
            messageApi.open({
                type: 'error',
                content: "Error! It's not email address.",
                duration: 5
            });
            return
        }
    }

    return (
        <>
            {contextHolder}
            <h3>Email</h3>
            <div className='name'>
                <div>
                    <p><span>Your Email is:</span> {lastName}</p>
                </div>
                <div>
                    <input placeholder='New email address' type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
                    <button onClick={handleChangeName}>Save</button>
                </div>
                <p style={{ fontSize: "14px", opacity: "0.5", fontWeight: "300" }}>To change your email address, you must <br /> have logged in again within the last 10 minutes!</p>
            </div>
        </>
    )
}

export default Email