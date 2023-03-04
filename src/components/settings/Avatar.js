import React, { useContext, useState } from 'react'
import { Image, Progress } from 'antd'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { HiOutlineCamera } from "react-icons/hi"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { db, storage } from '../../context/AuthContext/Firebase'

function Avatar() {
    const { currentUser } = useContext(AuthContext)
    const [photo, setPhoto] = useState(currentUser.photoURL)
    const [loading, setLoading] = useState(false)
    const [isProgress, setIsProgress] = useState()
    console.log(currentUser.photoURL)
    setInterval(() => {
        setPhoto(currentUser.photoURL)
    }, 1000);

    const handleUpdatePhoto = (e) => {
        const file = e.target.files[0]
        if (file !== undefined || null) {
            const storageRef = ref(storage, currentUser.photoURL);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setIsProgress(progress)
                    progress == "100" ? setLoading(false) : setLoading(true)
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
        } else { return }
    }
    return (
        <>
            <h3 className='text-info'>Your avatar</h3>
            <div className='user-photo-settings'>
                <div className="avatar">
                    {loading ?
                        <Progress
                            className='progress'
                            type="circle"
                            percent={isProgress}
                            strokeWidth={16}
                            width={40}
                            showInfo={false}
                            strokeColor="#fff"
                        /> :
                        <Image
                            preview={false}
                            src={photo}
                        />
                    }
                </div>

                <div className='form'>
                    <input type="file" id='upload' accept='image/*' onChange={handleUpdatePhoto} />
                    <label htmlFor="upload">
                        <HiOutlineCamera />
                    </label>
                </div>
            </div>
        </>
    )
}

export default Avatar