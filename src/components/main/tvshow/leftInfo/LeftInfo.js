import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';
import { initial } from '../../../../assets/reducer';

function LeftInfo() {
    const { movie } = useMovieContext()
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image className="poster-image" src={`https://image.tmdb.org/t/p/${initial.size}/${movie.poster_path}`} alt={movie.original_title} />
                </div>
            </div>
        </>
    )
}

export default LeftInfo