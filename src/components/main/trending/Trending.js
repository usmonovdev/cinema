import { Popover, Tooltip } from 'antd'
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { AiFillStar, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai'
import { GiSettingsKnobs } from "react-icons/gi"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import "./trending.scss"
import Filter from './Filter'
import { PopoverTitleTrending } from "../../../assets/AntD"
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function Trending() {
    const { getMovie, movie, loadingApi } = useMovieContext()
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const [loading, setLoading] = useState(false)
    const initialPosts = slice(movie.results, 0, index)
    const getData = () => {
        getMovie(`${API}${API_KEY}`)
    }
    useEffect(() => {
        getData()
    }, [])

    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setIndex(index + 4)
            setLoading(false)
        }, 1000);
        if (index >= 16) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    return (
        <div className='container'>
            <div className="title-settings-box">
                <h1 className='title'><span className='sharp'>#</span> Trending</h1>
                <Popover placement="topRight" content={<Filter />} title={PopoverTitleTrending} trigger="click">
                    <GiSettingsKnobs />
                </Popover>
            </div>
            <motion.ul
                className="trending"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {initialPosts.map((data) => {
                    const { id, poster_path, first_air_date, name, original_title, vote_average, media_type, release_date } = data
                    return (
                        <motion.li
                            className="trending-movie-container"
                            variants={item}
                            key={id}
                        >
                            <div className="trending-movie-box">
                                <img src={`${IMAGE_LINK}${poster_path}`} alt={name} />
                                <div className="trending-movie-info">
                                    <div className='info'>
                                        {name ? <p className='title'>{name}</p> : <p className='title'>{original_title}</p>}
                                        {first_air_date ? <p>{first_air_date}</p> : <p>{release_date}</p>}
                                        <Tooltip placement="top" title={"Vote Average"} color={"#343434"}>
                                            <div className='vote-average'>
                                                <AiFillStar />{vote_average}
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div className="like-and-open">
                                        <Tooltip placement="top" title={"Mark As Fovorite"} color={"#343434"}>
                                            <div className='icon'>
                                                <AiOutlineHeart />
                                            </div>
                                        </Tooltip>
                                        <Link to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}>
                                            <div className='play'>
                                                <p>Play</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    )
                })}
            </motion.ul>
            {isCompleted ? "" :
                <>
                    <button className='load-more' onClick={loadMore}>
                        {loading && !loadingApi ? <div className='spin'></div> : <><p>Load More</p><MdOutlineKeyboardArrowDown className='load-icon' /></>}
                    </button>
                </>
            }
        </div>
    )
}

export default Trending