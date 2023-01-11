import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { AiFillStar } from "react-icons/ai"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState({
        img: "",
        title: "",
        release: "",
        vote: "",
        overview: "",
        original_language: ""
    })
    const [defaultImg, setDefaultImage] = useState(2)
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
            .then((res) => {
                setFirstPage({
                    img: `https://image.tmdb.org/t/p/original/${res.data.results[defaultImg].poster_path}`,
                    title: res.data.results[defaultImg].title,
                    release: res.data.results[defaultImg].release_date,
                    vote: res.data.results[defaultImg].vote_average,
                    overview: res.data.results[defaultImg].overview,
                    original_language: res.data.results[defaultImg].original_language
                })
                console.log(res)
            })
    }, [])
    console.log(firstPage)
    return (
        <>
            <Navbar />
            <div className="ads">
                <div className='bg-image' style={{
                    backgroundImage: `url(${firstPage.img})`
                }}>
                    <div className='info-box'>
                        <div className='title-vote-box'>
                            <h1>{firstPage.title}</h1>
                            <div className='vote-average'>
                                <AiFillStar />{firstPage.vote}
                            </div>
                        </div>
                        <p className='info-release'>
                            {firstPage.release}
                            <span>({firstPage.original_language})</span>
                        </p>
                        <p className='info-overview'>{firstPage.overview.slice(0, 40)}...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home