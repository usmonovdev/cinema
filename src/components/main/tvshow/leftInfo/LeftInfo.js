import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';
import ImageLoading from "../../../loading/image/Image"

function LeftInfo({ show }) {
    const { imgState } = useMovieContext()
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image 
                        className="poster-image" 
                        src={`https://image.tmdb.org/t/p/${imgState.size}/${show.poster_path}`} 
                        alt={show.original_title} 
                        placeholder={
                            <ImageLoading />
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default LeftInfo