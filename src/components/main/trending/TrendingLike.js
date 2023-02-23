import { Image } from 'antd'
import React from 'react'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import ImageLoading from "../../loading/image/Image"

function TrendingLike({ data }) {
    const { poster_path, media_type, id, title, movie } = data
    const { imgState } = useMovieContext()
    const [addLike, setAddLike] = useState(false)
    const like = (e) => {
        setAddLike(!addLike)
        console.log(e)
    }
    return (
        <div className="trending-movie-box">
            <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                alt={title}
                fallback={movie}
                placeholder={
                    <ImageLoading />
                }
            />
            <div className="trending-movie-info">
                <div className="like-and-open">
                    <div className='icon' onClick={() => like(id)}>
                        {addLike ? <AiFillHeart /> : <AiOutlineHeart />}
                    </div>
                    <Link to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}>
                        <div className='play'>
                            <p>Play</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TrendingLike