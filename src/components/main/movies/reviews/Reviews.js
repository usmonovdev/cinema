import axios from 'axios'
import React from 'react'
import image from "../../../../assets/logo-white.png"
import "../../../navbar/navbar.scss"
import "./reviews.scss"
import "../../../../assets/slick.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../../../../context/StateContext/StateContext'
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Reviews({ moviesId }) {
    const [reviews, setReviews] = useState([])
    const { imageSize } = useStateContext()

    console.log(reviews)
    useEffect(() => {
        axios.get(`${API}${moviesId}/reviews?api_key=${API_KEY}`)
            .then((data) => {
                setReviews(data.data.results)
            });
    }, []);
    return (
        <div className='container'>
            <div className="actors-box">
                <div className="actors-title">
                    <h1 className='title'>
                        <span className='sharp'>#</span>
                        Comments
                    </h1>
                </div>
                {reviews?.map((data) => {
                    const { author, author_details, id, created_at } = data
                    // console.log(author_details.avatar_path)
                    return (
                        <div className="review" key={id}>
                            <div className='user'>
                                {author_details.avatar_path ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${author_details.avatar_path}`}
                                        alt={author}
                                    />
                                    :
                                    <img src={image}/>
                                }
                            </div>
                            <div className='commit'>
                                <div className='info'>
                                    <p>{author} • {created_at.slice(0, 10)}</p>
                                    <p></p>
                                </div>
                                <p>{data.content.slice(0, 200)}...</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reviews