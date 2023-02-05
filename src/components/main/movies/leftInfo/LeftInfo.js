import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { initial } from '../../../../assets/reducer';
import movieNotLoaded from "../../../../assets/movie-photo-not-downloaded.jpg"

function LeftInfo({ movie }) {
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image 
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/${initial.size}/${movie.poster_path}`}
                        alt={movie.original_title}
                        fallback={movieNotLoaded}
                    />
                </div>
            </div>
        </>
    )
}

export default LeftInfo