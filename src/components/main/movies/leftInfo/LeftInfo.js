import React from 'react'
import { LoadImage } from "../../../index"
import { Image } from 'antd';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';
import movieNotLoaded from "../../../../assets/movie-photo-not-downloaded.jpg"
import "../leftInfo/leftinfo.scss"

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
                            <LoadImage />
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default LeftInfo