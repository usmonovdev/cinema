import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { initial } from '../../../../assets/reducer';

function LeftInfo({ show }) {
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image className="poster-image" src={`https://image.tmdb.org/t/p/${initial.size}/${show.poster_path}`} alt={show.original_title} />
                </div>
            </div>
        </>
    )
}

export default LeftInfo