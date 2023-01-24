import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { Tooltip } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function TrendingData({ initialPosts }) {
    console.log(initialPosts)
    return (
        <motion.ul
            className={`trending ${initialPosts.length == 0 ? "trendingNoItem" : ""}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {initialPosts.length !== 0 ?
                <>
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
                </> :
                <div className='noItems'>
                    <RiMovie2Line />
                    <p>Items not found!</p>
                </div>

            }
        </motion.ul>
    )
}

export default TrendingData