import React from 'react'
import "../leftInfo/leftinfo.scss"
import { Image } from 'antd';
import movieNotLoaded from "../../../../assets/movie-photo-not-downloaded.jpg"
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';
import ImageLoading from "../../../loading/image/Image"

function LeftInfo({ movie }) {
    const { imgState } = useMovieContext()
    return (
        <>
            <div className="left-info">
                <div className="poster-image-box">
                    <Image 
                        className="poster-image"
                        src={`https://image.tmdb.org/t/p/${imgState.size}/${movie.poster_path}`}
                        alt={movie.original_title}
                        fallback={movieNotLoaded}
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