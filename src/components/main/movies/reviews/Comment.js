import React from 'react'
import { useState } from 'react'

function Comment({ content }) {
    const [commentLength, setCommentLength] = useState("180")
    const [read, setRead] = useState(false)
    const sliceContent = content.substring(0, commentLength)
    const readMore = () => {
        setCommentLength(content.length)
        setRead(true)
    }
    return (
        <>
            <p className='content'>{sliceContent}{!read ? "..." : ""}</p>
            {!read ? <p className='read-more' onClick={readMore}>Read More</p> : ""}
        </>
    )
}

export default Comment