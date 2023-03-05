import React, { useState, useContext } from 'react'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db, storage } from '../../context/AuthContext/Firebase'
import { message } from 'antd'

function Name() {
    const [messageApi, contextHolder] = message.useMessage();
    const { currentUser } = useContext(AuthContext)
    const [newName, setNewName] = useState("")
    const [lastName, setLastName] = useState(currentUser.displayName)

    setInterval(() => {
        setLastName(currentUser.displayName)
    }, 1000);

    const handleChangeName = () => {
        if (newName.length > 3) {

            const storageRef = ref(storage, currentUser.displayName);
            const uploadTask = uploadBytesResumable(storageRef, newName);
            uploadTask.on('state_changed',
            () => {
                updateProfile(currentUser, {
                    displayName: newName,
                    photoURL: currentUser.photoURL
                }).then(() => {
                    messageApi.open({
                        type: 'success',
                        content: 'Name updated successful!',
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
                    displayName: newName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                });
            }
            );
        } else {
            messageApi.open({
                type: 'error',
                content: "The length of the name must not be less than 4!",
                duration: 5
            });
        }
    }

    return (
        <>
            {contextHolder}
            <h3>Name</h3>
            <div className='name'>
                <div>
                    <p><span>Your Name is:</span> {lastName}</p>
                </div>
                <div>
                    <input placeholder='New name' type="text" onChange={(e) => setNewName(e.target.value)} value={newName} />
                    <button onClick={handleChangeName}>Save</button>
                </div>
            </div>
        </>
    )
}

export default Name