import { Spin, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdSettingsInputComposite } from "react-icons/md"
import { GoSettings } from "react-icons/go"
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./trending.scss"
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function Trending() {
    const antIcon = (
        <LoadingOutlined
            style={{ fontSize: 24 }}
            spin
        />
    );
    const { getMovie, movie } = useMovieContext()
    const [showMovieInfo] = useState(true)
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const [loading, setLoading] = useState(false)
    const initialPosts = slice(movie.results, 0, index)
    const getData = () => {
        getMovie(`${API}${API_KEY}`)
    }

    const openedMovie = (data) => {
        console.log(data.id)
    }

    const loadMore = () => {
        setIndex(index + 4)
        console.log(index)
        if (index >= 16) {
            setIsCompleted(true)
            console.log("completed")
        } else {
            setIsCompleted(false)
            console.log("not completed")
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='container'>
            <div className="title-settings-box">
                <h1 className='title'>Trending Movies</h1>
                <GoSettings />
            </div>
            <div className="trending">
                {initialPosts.map((data) => {
                    const { id, poster_path, first_air_date, name, original_title, vote_average, overview, release_date } = data
                    return (
                        <div className={`trending-movie-container ${showMovieInfo ? "open" : ""}`}
                            key={id}
                            onClick={() => openedMovie(data)}
                        >
                            <div className="trending-movie-box">
                                <img src={`${IMAGE_LINK}${poster_path}`} alt="" />
                                {/* <div className="trending-movie-info">
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
                                </div> */}
                                <div className="open-movie-box">
                                    <div className="add-to-liked-movies">
                                        <AiOutlineHeart />
                                    </div>
                                    <div className="open-movie">
                                        <button>Open Movie</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isCompleted ? "" :
                <button className='load-more' onClick={loadMore}>
                    {loading ? <Spin indicator={antIcon} /> : <><p>Load More</p><MdOutlineKeyboardArrowDown className='load-icon' /></>}
                </button>
            }
        </div>
    )
}

export default Trending