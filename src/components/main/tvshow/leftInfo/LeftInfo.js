import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';

function LeftInfo({ show }) {
    const { imgState } = useMovieContext()
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image className="poster-image" src={`https://image.tmdb.org/t/p/${imgState.size}/${show.poster_path}`} alt={show.original_title} />
                </div>
            </div>
        </>
    )
}

export default LeftInfo