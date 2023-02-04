import React from 'react'
import { useState } from 'react'

function Comment({ content }) {
    const [commentLength, setCommentLength] = useState("150")
    const [read, setRead] = useState(false)
    const sliceContent = content.substring(0, commentLength)
    const readMore = () => {
        setCommentLength(content.length)
        setRead(true)
    }
    return (
        <div>
            <p className='content'>{sliceContent}</p>
            {!read ? <p className='read-more' onClick={readMore}>Read More</p> : ""}
        </div>
    )
}

export default Comment