import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { AiFillStar } from "react-icons/ai"
import { BiLeftArrowAlt, BiPlay, BiRightArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Tooltip, Skeleton } from 'antd';
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState([])
    const [index, setIndex] = useState(0)

    // Document title
    useEffect(() => {
        document.title = "Cinema App - Home"
    })

    // Fetch API
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            .then((res) => {
                setFirstPage(res.data.results.slice(0, 10))
            })
    }, [])

    // Next Movie Swipe Function
    useEffect(() => {
        const slide = firstPage.length - 1;
        if (index < 0) {
            setIndex(slide)
        }
        if (index > slide) {
            setIndex(0)
        }
    }, [firstPage, index])

    // Auto Animation
    useEffect(() => {
        const time = setInterval(() => {
            setIndex(index + 1)
        }, 10000);
        return () => {
            clearInterval(time)
        }
    })

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    })
    return (
        <>
            <Skeleton active loading={loading}>
                <Navbar />
                <div className="ads">
                    {firstPage.map((data, indexSlide) => {
                        const { id, backdrop_path, title, vote_average, release_date, original_language, overview } = data;
                        let slide = "nextMovie";
                        if (indexSlide === index) {
                            slide = "activeMovie";
                        }
                        if (indexSlide === index - 1 || (index === 0 && indexSlide === firstPage.length - 1)) {
                            slide = "lastMovie";
                        }
                        return (
                            <div className={`bg-image ${slide}`} key={id} style={{
                                backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`
                            }}>
                                <div className='top-popular-home'>
                                    <div className='play-and-next'>
                                        <div>
                                            <button onClick={() => setIndex(index - 1)}>
                                                <BiLeftArrowAlt />
                                            </button>
                                            <button onClick={() => setIndex(index + 1)}>
                                                <BiRightArrowAlt />
                                            </button>
                                        </div>
                                        <div>
                                            <Link to={`/movies/${id}`} className='play-watch-now'><div>Watch Now!</div></Link>
                                            <Link to={`/movies/${id}`}><button className='play-icon'><BiPlay /></button></Link>
                                        </div>
                                    </div>
                                    <div className='info-box'>
                                        <div className='title-vote-box'>
                                            <h1>{title.length < 30 ? <>{title}</> : <>{title.slice(0, 20)}...</>}</h1>
                                            <Tooltip placement="top" title={"Vote Average"} color={"#343434"}>
                                                <div className='vote-average'>
                                                    <AiFillStar />{vote_average}
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <p className='info-release'>
                                            {release_date}
                                            <span>({original_language})</span>
                                        </p>
                                        <p className='info-overview'>{overview.slice(0, 40)}...</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Skeleton>
        </>
    )
}

export default Home