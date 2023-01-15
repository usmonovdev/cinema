import React from 'react'
import { FaExpand } from "react-icons/fa"
const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

function LeftInfo( { movie } ) {
    return (
        <>
            <div className="poster-image-box">
                <img className="poster-image" src={`${IMAGE_LINK}${movie.poster_path}`} alt={movie.original_title} />
                <div className="open-image-expand">
                    <p><FaExpand className="expand-icon" />Expand</p>
                </div>
            </div>
        </>
    )
}

export default LeftInfo