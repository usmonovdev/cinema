import React from 'react'
import { FaExpand } from "react-icons/fa"

function LeftInfo( { movie } ) {
    return (
        <>
            <div className="poster-image-box">
                <img className="poster-image" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.original_title} />
                <div className="open-image-expand">
                    <p><FaExpand className="expand-icon" />Expand</p>
                </div>
            </div>
        </>
    )
}

export default LeftInfo