import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { AiFillStar } from "react-icons/ai"
import { BiLeftArrowAlt, BiPlay, BiRightArrowAlt } from 'react-icons/bi'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            .then((res) => {
                setFirstPage(res.data.results)
                console.log(res)
            })
    }, [])
    const custom = 0;
    console.log(firstPage)
    return (
        <>
            <Navbar />
            <div className="ads">
                {firstPage.map((data) => {
                    return (
                        <div className='bg-image' key={custom} style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${data.backdrop_path}")`
                        }}>
                            <div className='top-popular-home'>
                                <div className='play-and-next'>
                                    <div>
                                        <button>
                                            <BiLeftArrowAlt />
                                        </button>
                                        <button>
                                            <BiRightArrowAlt />
                                        </button>
                                    </div>
                                    <div>
                                        <div className='play-watch-now'>Watch Now!</div>
                                        <button className='play-icon'><BiPlay /></button>
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <div className='title-vote-box'>
                                        <h1>{data.title.length < 30 ? <>{data.title}</> : <>{data.title.slice(0, 20)}...</>}</h1>
                                        <div className='vote-average'>
                                            <AiFillStar />{data.vote_average}
                                        </div>
                                    </div>
                                    <p className='info-release'>
                                        {data.release_date}
                                        <span>({data.original_language})</span>
                                    </p>
                                    <p className='info-overview'>{data.overview.slice(0, 40)}...</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home