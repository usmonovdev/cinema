import React from 'react'
import { useState } from 'react'

function Comment({ content }) {
    const [commentLength, setCommentLength] = useState("180")
    const [read, setRead] = useState(false)
    const sliceContent = content.substring(0, commentLength)
    const readMore = () => {
        setCommentLength(content.length)
        setRead(!read)
    }
    const lessMore = () => {
        setCommentLength("180")
        setRead(!read)
    }
    return (
        <>
            <p className='content'>{sliceContent}{!read ? "..." : ""}</p>
            {!read ? <p className='read-more' onClick={readMore}>Read More</p> : <p className='read-more' onClick={lessMore}> Less More</p>}
        </>
    )
}

export default Comment