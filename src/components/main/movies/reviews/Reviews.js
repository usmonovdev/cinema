import axios from 'axios'
import React from 'react'
import image from "../../../../assets/logo-white.png"
import "../../../navbar/navbar.scss"
import "./reviews.scss"
import "../../../../assets/slick.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { useStateContext } from '../../../../context/StateContext/StateContext'
import { BsChatLeftDotsFill } from 'react-icons/bs'
import { motion } from "framer-motion"
import Comment from './Comment'
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Reviews({ moviesId }) {
    const [reviews, setReviews] = useState([])
    const { imageSize } = useStateContext()
    const [read, setRead] = useState("200")
    const [readMoreButton, setMoreButton] = useState(true)

    console.log(reviews)
    useEffect(() => {
        axios.get(`${API}${moviesId}/reviews?api_key=${API_KEY}`)
            .then((data) => {
                setReviews(data.data)
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
                {reviews.results?.length !== 0 ? <>{reviews.results?.map((data) => {
                    const { author, author_details, id, created_at, content } = data
                    return (
                        <div className="review" key={id}>
                            <div className='user'>
                                {author_details.avatar_path ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${author_details.avatar_path}`}
                                        alt={author}
                                    />
                                    :
                                    <img src={image} />
                                }
                            </div>
                            <div className='commit'>
                                <div className='info'>
                                    <p>{author} • <span>{created_at.slice(0, 10)}</span></p>
                                </div>
                                <Comment content={content} />
                                {/* <p>{readMoreButton ? <>... <span onClick={() => readMore(id, sliceContent)} className='read-more'>Read more</span></> : ""}</p> */}
                            </div>
                        </div>
                    )
                })}</> : <div className='no-review'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: -360, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <BsChatLeftDotsFill className='icon' />
                    </motion.div>
                    <p>No Comments!</p>
                </div>}
            </div>
        </div>
    )
}

export default Reviews