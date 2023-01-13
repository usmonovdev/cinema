import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { AiFillStar } from "react-icons/ai"
import { BiLeftArrowAlt, BiPlay, BiRightArrowAlt } from 'react-icons/bi'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState([])
    const [index, setIndex] = useState(0)
    // const [sliderTime, setSliderTime] = useState(10000)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            .then((res) => {
                setFirstPage(res.data.results.slice(0, 10))
                console.log(res)
            })
    }, [])

    useEffect(() => {
        const slide = firstPage.length - 1;
        if (index < 0) {
            setIndex(slide)
        }
        if (index > slide) {
            setIndex(0)
        }
    }, [firstPage, index])

    useEffect(() => {
        const time = setInterval(() => {
            setIndex(index + 1)
        }, 10000);
        return () => {
            clearInterval(time)
        }
    })

    console.log(firstPage)
    console.log(index)
    return (
        <>
            <Navbar />
            <div className="ads">
                {firstPage.map((data, indexSlide) => {
                    const { id, backdrop_path, title, vote_average, release_date, original_language, overview } = data;
                    let slide = "nextMovie";
                    if (indexSlide === index) {
                        slide = "activeMovie"
                    }
                    if (indexSlide === index - 1 || (index === 0 && indexSlide === firstPage.length - 1)) {
                        slide = "lastMovie"
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
                                        <div className='play-watch-now'>Watch Now!</div>
                                        <button className='play-icon'><BiPlay /></button>
                                    </div>
                                </div>
                                <div className='info-box'>
                                    <div className='title-vote-box'>
                                        <h1>{title.length < 30 ? <>{title}</> : <>{title.slice(0, 20)}...</>}</h1>
                                        <div className='vote-average'>
                                            <AiFillStar />{vote_average}
                                        </div>
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
        </>
    )
}

export default Home