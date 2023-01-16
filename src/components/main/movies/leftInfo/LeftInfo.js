import React, { useState } from 'react'
import { FaExpand } from "react-icons/fa"
import { RiCloseFill } from 'react-icons/ri'
import "../leftInfo/leftinfo.scss"

function LeftInfo({ movie }) {
    const [openImage, setOpenImage] = useState(false)
    console.log(openImage)
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <img className="poster-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} />
                    <div className="open-image-expand">
                        <p onClick={() => setOpenImage(true)}><FaExpand className="expand-icon" />Expand</p>
                    </div>
                </div>
            </div>
            {openImage ?
                <div className='open-image-container'>
                    <RiCloseFill className='close-image-box' onClick={() => setOpenImage(false)} />
                    <div className='open-image-box'>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} />
                    </div>
                </div> : ""}
        </>
    )
}

export default LeftInfo