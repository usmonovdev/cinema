import { Image } from 'antd'
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import ImageLoading from "../../loading/image/Image"
import { message } from 'antd';
import { useEffect } from 'react'
import movieImage from "../../../assets/movie-photo-not-downloaded.jpg"

function TrendingLike({ data }) {
    const { poster_path, media_type, id, title } = data
    const { imgState } = useMovieContext()

    const [addLike, setAddLike] = useState(false)
    const [localMovie, setLocalMovie] = useState([])
    // console.log("Local movie", localMovie)
    // FOR USER INFO IN ADDING LIKED MOVIES
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const like = (e) => {
        setAddLike(!addLike)
        setLocalMovie(e)
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: `${addLike ? "Removed in Liked Movies" : 'Added in Liked Movies'}`,
                duration: 2,
            });
        }, 1800);
    }

    useEffect(() => {
        localStorage.setItem("LIKED_MOVIES", JSON.stringify(localMovie))
    }, [localMovie])
    return (
        <div className="trending-movie-box">
            {contextHolder}
            <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                alt={title}
                fallback={movieImage}
                placeholder={
                    <ImageLoading />
                }
            />
            <div className="trending-movie-info">
                <div className="like-and-open">
                    <div className='icon' onClick={() => like(data)}>
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