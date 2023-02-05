import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { Tooltip } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { useState } from 'react';
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function SimilarData({ initialPosts }) {
    const { isCompleted, setIsCompleted, index, setIndex } = useMovieContext()
    const [loading, setLoading] = useState(false)
    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setIndex(index + 4)
            setLoading(false)
        }, 1000);
        if (index >= 16 || initialPosts.length < 3) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    return (
        <>
            <motion.ul
                className={`trending ${initialPosts.length == 0 ? "trendingNoItem" : ""}`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {initialPosts.length !== 0 ?
                    <>
                        {initialPosts.map((data) => {
                            const { id, poster_path, first_air_date, name, title, vote_average, media_type, release_date } = data
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
                                                {name ? <p className='title'>{name}</p> : <p className='title'>{title}</p>}
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
                    </> :
                    <div className='noItems'>
                        <RiMovie2Line />
                        <p>Items not found!</p>
                    </div>

                }
            </motion.ul>
            {isCompleted  ? "" :
                <>
                    <button className='load-more' onClick={loadMore}>
                        {loading ? <div className='spin'></div> : <><p>Load More</p><MdOutlineKeyboardArrowDown className='load-icon' /></>}
                    </button>
                </>
            }
        </>
    )
}

export default SimilarData