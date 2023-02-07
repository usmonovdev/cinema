import React, { useReducer, useState } from 'react'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { RiMovie2Line } from "react-icons/ri"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'antd';
import { slice } from 'lodash';
import actor from "../../../assets/actor-photo-not-downloaded.jpg"
import { container, item } from '../../../assets/Framer'
import { initial, reducer } from "../../../assets/reducer"
import { Image } from 'antd'

function SimilarData({ filter }) {

    const initialState = {
        completed: false,
        index: 4,
        loading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const similar = slice(filter, 0, state.index)

    const loadMore = () => {
        dispatch({ type: "LOADING" })

        setTimeout(() => {
            dispatch({ type: "LOAD_MORE" })
            dispatch({ type: "LOADING_FALSE" })
        }, 5000);

        if (state.index >= 16 || similar.length < 3) {
            dispatch({ type: "IS_COMPLETED" })
        }
    }

    return (
        <>
            {similar.length !== 0 ?
                <>
                    <motion.ul
                        className="trending"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {similar.map((data) => {
                            const { id, poster_path, first_air_date, name, title, vote_average, media_type, release_date } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <div className="trending-movie-box">
                                        <Image
                                            preview={false}
                                            src={`https://image.tmdb.org/t/p/${initial.size}/${poster_path}`}
                                            alt={name}
                                            fallback={actor}
                                        />
                                        <div className="trending-movie-info">
                                            <div className="like-and-open">
                                                <Tooltip
                                                    placement="top"
                                                    title={"Mark As Fovorite"}
                                                    color={"#343434"}
                                                >
                                                    <div className='icon'>
                                                        <AiOutlineHeart />
                                                    </div>
                                                </Tooltip>
                                                <Link
                                                    to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}
                                                >
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
                </> :
                <div className="trendingNoItem">
                    <div className='noItems'>
                        <RiMovie2Line />
                        <p>Items not found!</p>
                    </div>
                </div>
            }
            {state.completed ? "" :
                <>
                    <button className='load-more' onClick={loadMore}>
                        {state.loading ?
                            <div className='spin'></div>
                            :
                            <>
                                <p>Load More</p>
                                <MdOutlineKeyboardArrowDown className='load-icon' />
                            </>}
                    </button>
                </>
            }
        </>
    )
}

export default SimilarData