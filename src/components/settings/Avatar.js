import { Image } from 'antd'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

function Avatar() {
    const handleUpdatePhotoURL = () => {

    }
    return (
        <>
            <p className='text-info'>Avatar</p>
            <div className='user-photo-settings'>
                <Image
                    className='avatar'
                    preview={false}
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