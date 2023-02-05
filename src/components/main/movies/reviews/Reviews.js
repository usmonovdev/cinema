import axios from 'axios'
import React from 'react'
import image from "../../../../assets/user-not-downloaded.jpg"
import "../../../navbar/navbar.scss"
import "./reviews.scss"
import "../../../../assets/slick.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { BsChatLeftDotsFill } from 'react-icons/bs'
import { motion } from "framer-motion"
import Comment from './Comment'
import { Image } from 'antd'
import { initial } from '../../../../assets/reducer'
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Reviews({ moviesId }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get(`${API}${moviesId}/reviews?api_key=${API_KEY}`)
            .then((data) => {
                setReviews(data.data)
            });
    }, []);
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
                                            fallback={image}
                                            preview={false}
                                            src={`https://image.tmdb.org/t/p/${initial.size}/${author_details.avatar_path}`}
                                            alt={author}
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