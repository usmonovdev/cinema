import { Image } from 'antd'
import React from 'react'
import { useContext } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { AuthContext } from '../../context/AuthContext/AuthContext'

function Avatar() {
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    return (
        <>
            <p className='text-info'>Avatar</p>
            <div className='user-photo-settings'>
                <Image
                    className='avatar'
                    preview={false}
                    src={currentUser.photoURL}
                />
                <div>
                    <input type="file" id='upload' accept='image/*' />
                    <label htmlFor="upload">
                        Upload
                    </label>
                    <button><MdDeleteOutline/></button>
                </div>
            </div>
        </>
    )
}

export default Avatar