import React from 'react'
import photo from "./user-not-downloaded-color.png"
import "./Photos.scss"

function UserNotDownloaded() {
    return (
        <div className='user-not-downloaded'>
            <img src={photo} alt="user-not-downloaded" />
        </div>
    )
}

export default UserNotDownloaded