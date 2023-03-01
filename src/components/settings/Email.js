import { updateEmail, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { HiPencil } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db, storage } from '../../context/AuthContext/Firebase'

function Email() {
    const { currentUser } = useContext(AuthContext)
    const [newEmail, setNewEmail] = useState("")
    const [openEdit, setOpenEdit] = useState(false)
    console.log(newEmail)
    const handleChangeName = () => {
        const storageRef = ref(storage, currentUser.email);
        const uploadTask = uploadBytesResumable(storageRef, newEmail);
        uploadTask.on('state_changed',
            () => {
                updateEmail(currentUser, {
                    email: newEmail,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                });
                setDoc(doc(db, "users", currentUser.uid), {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: newEmail,
                    photoURL: currentUser.photoURL,
                });
            }
        );
    }

    const edit = () => {
        setOpenEdit(!openEdit)
    }

    return (
        <div className='name'>
            <div onClick={edit}>
                <p>Email: {currentUser.email}</p>
                <HiPencil />
            </div>
            <div className={`editBox ${openEdit ? "active" : ""}`}>
                <input placeholder='New email address' type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
                <button onClick={handleChangeName}>Save</button>
            </div>
        </div>
    )
}

export default Email