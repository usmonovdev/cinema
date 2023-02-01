import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { useStateContext } from '../../../../context/StateContext/StateContext';

function LeftInfo({ movie }) {
    const { imageSize } = useStateContext()
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image className="poster-image" src={`https://image.tmdb.org/t/p/${imageSize}/${movie.poster_path}`} alt={movie.original_title} />
                </div>
            </div>
        </>
    )
}

export default LeftInfo