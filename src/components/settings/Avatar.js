import React, { useContext, useEffect } from 'react'
import { Image } from 'antd'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { MdDeleteOutline } from 'react-icons/md'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db, storage } from '../../context/AuthContext/Firebase'

function Avatar() {
    const { currentUser } = useContext(AuthContext)
    const handleUpdatePhotoURL = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        const storageRef = ref(storage, currentUser.displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            () => {
                console.log("Image not uploaded!")
            },
            () => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateProfile(currentUser, {
                        displayName: currentUser.displayName,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db, "users", currentUser.uid), {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: downloadURL,
                    });
                });
            }
        );
    }
    return (
        <>
            <p className='text-info'>Avatar</p>
            <div className='user-photo-settings'>
                <Image
                    className='avatar'
                    preview={false}
                    src={currentUser?.photoURL}
                />
                <div className='form'>
                    <form onSubmit={handleUpdatePhotoURL}>
                        <input type="file" id='upload' accept='image/*' />
                        <label htmlFor="upload">
                            Upload
                        </label>
                        <button><MdDeleteOutline /></button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Avatar