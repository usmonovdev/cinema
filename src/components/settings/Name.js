import React, { useState, useContext } from 'react'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db, storage } from '../../context/AuthContext/Firebase'
import { HiPencil } from 'react-icons/hi'

function Name() {
    const { currentUser } = useContext(AuthContext)
    const [newName, setNewName] = useState("")
    const [lastName, setLastName] = useState(currentUser.displayName)
    const [openEdit, setOpenEdit] = useState(false)

    setInterval(() => {
        setLastName(currentUser.displayName)
    }, 1000);

    const handleChangeName = () => {
        const storageRef = ref(storage, currentUser.displayName);
        const uploadTask = uploadBytesResumable(storageRef, newName);
        uploadTask.on('state_changed',
            () => {
                updateProfile(currentUser, {
                    displayName: newName,
                    photoURL: currentUser.photoURL
                });
                setDoc(doc(db, "users", currentUser.uid), {
                    uid: currentUser.uid,
                    displayName: newName,
                    email: currentUser.email,
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
                <p>Name: {lastName}</p>
                <HiPencil />
            </div>
            <div className={`editBox ${openEdit ? "active" : ""}`}>
                <input placeholder='New display name' type="text" onChange={(e) => setNewName(e.target.value)} value={newName} />
                <button onClick={handleChangeName}>Save</button>
            </div>
        </div>
    )
}

export default Name