import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { Tooltip } from 'antd';
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function TrendingData({ initialPosts }) {
    return (
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
    )
}

export default TrendingData