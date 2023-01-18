import { Tooltip } from 'antd'
import axios from 'axios'
import { Sling, Turn } from 'hamburger-react'
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./trending.scss"
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

function Trending() {
    const { getMovie, movie } = useMovieContext()
    const [showMovieInfo] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const initialPosts = slice(movie.results, 0, index)
    const getData = () => {
        getMovie(`${API}${API_KEY}`)
    }

    const loadMore = () => {
        setIndex(index + 4)
        console.log(index)
        if (index >= 20) {
            setIsCompleted(true)
            console.log("completed")
        } else {
            setIsCompleted(false)
            console.log("not completed")
        }
    }

    console.log(initialPosts)
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='container'>
            <h1 className='title'>Trending Movies</h1>
            <div className="trending">
                {initialPosts.map((data) => {
                    const { id, poster_path, first_air_date, name, original_title, vote_average, overview, release_date } = data
                    return (
                        <div className="trending-movie-container" key={id}>
                            <div className="trending-movie-box">
                                <img src={`${IMAGE_LINK}${poster_path}`} alt="" />
                                <div className={`trending-movie-info ${showMovieInfo ? "open" : ""}`}>
                                    <div className="trending-name-vote">
                                        {name ? <p>{name}</p> : <p>{original_title}</p>}
                                        <Tooltip placement="top" title={"Vote Average"} color={"#343434"}>
                                            <div className='vote-average'>
                                                <AiFillStar />{vote_average}
                                            </div>
                                        </Tooltip>
                                    </div>
                                    {first_air_date ? <p>{first_air_date}</p> : <p>{release_date}</p>}
                                    <p>{overview.slice(0, 50)}...</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isCompleted ? "" : <button className='load-more' onClick={loadMore}>load more</button>}
        </div>
    )
}

export default Trending