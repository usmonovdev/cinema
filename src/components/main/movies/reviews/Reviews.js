import React, { useState, useEffect } from 'react'
import axios from 'axios'
import image from "../../../../assets/user-not-downloaded.jpg"
import Comment from './Comment'
import { Image } from 'antd'
import { useMovieContext } from '../../../../context/MovieContex/MovieContex'
import "../../../navbar/navbar.scss"
import "./reviews.scss"
import "../../../../assets/slick.css"
import ImageLoading from "../../../loading/image/Image"

function Reviews({ moviesId, type }) {
    const { imgState } = useMovieContext()
    const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
    const API = `https://api.themoviedb.org/3/${type == "movie" ? "movie" : "tv"}/`
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get(`${API}${moviesId}/reviews?api_key=${API_KEY}`)
            .then((data) => {
                setReviews(data.data)
            });
    }, [moviesId]);
    return (
        <>
            {reviews.results?.length !== 0 ? <>
                <div className='container'>
                    <div className="actors-box">
                        <div className="actors-title">
                            <h1 className='title'>
                                <span className='sharp'>#</span>
                                Comments
                            </h1>
                        </div>
                        {reviews.results?.map((data) => {
                            const { author, author_details, id, created_at, content } = data
                            return (
                                <div className="review" key={id}>
                                    <div className='user'>
                                        <Image
                                            preview={false}
                                            src={`https://image.tmdb.org/t/p/${imgState.size}/${author_details.avatar_path}`}
                                            alt={author}
                                            fallback={image}
                                            placeholder={
                                                <ImageLoading />
                                            }
                                        />
                                    </div>
                                    <div className='commit'>
                                        <div className='info'>
                                            <p>{author} • <span>{created_at.slice(0, 10)}</span></p>
                                        </div>
                                        <Comment content={content} />
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </> : ""}
        </>

    )
}

export default Reviews