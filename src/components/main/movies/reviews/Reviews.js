import axios from 'axios'
import React from 'react'
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
                    return (
                        <div className="actor" key={data.id}>
                            <div>
                                <div>
                                    <p className='aut'>{data.author}</p>
                                    <img src={data.avatar_path} alt={data.author} />
                                </div>
                            </div>
                            <p>{data.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reviews