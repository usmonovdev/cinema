import React, { useReducer } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { Tooltip } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { initial, reducer } from '../../../assets/reducer';
import { slice } from 'lodash';

function UpcomingData({ filter }) {
    const initialState = {
        completed: false,
        index: 4,
        loading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const upcoming = slice(filter, 0, state.index)

    const loadMore = () => {
        dispatch({ type: "LOADING" })
        
        setTimeout(() => {
            dispatch({ type: "LOAD_MORE" })
            dispatch({ type: "LOADING_FALSE" })
        }, 5000);

        if (state.index >= 16 || upcoming.length < 3) {
            dispatch({ type: "IS_COMPLETED" })
        }
    }
    return (
        <>
            <motion.ul
                className={`trending ${upcoming.length == 0 ? "trendingNoItem" : ""}`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {upcoming.length !== 0 ?
                    <>
                        {upcoming.map((data) => {
                            const { id, poster_path, first_air_date, name, title, vote_average, media_type, release_date } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <div className="trending-movie-box">
                                        <img src={`https://image.tmdb.org/t/p/${initial.size}/${poster_path}`} alt={name} />
                                        <div className="trending-movie-info">
                                            <div className='info'>
                                                {name ? <p className='title'>{name}</p> : <><p className='title'>{title}</p></>}
                                                {first_air_date ? <p>{first_air_date}</p> : <p>{release_date}</p>}
                                                <Tooltip 
                                                    placement="top" 
                                                    title={"Vote Average"} 
                                                    color={"#343434"}
                                                >
                                                    <div className='vote-average'>
                                                        <AiFillStar />{vote_average}
                                                    </div>
                                                </Tooltip>
                                            </div>
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
                                                <Link to={`/movie/${id}`}>
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
            {state.completed ? "" :
                <>
                    <button className='load-more' onClick={loadMore}>
                        {state.loading ? 
                            <div className='spin'></div> 
                            : 
                            <>
                                <p>Load More</p>
                                <MdOutlineKeyboardArrowDown className='load-icon' />
                            </>
                        }
                    </button>
                </>
            }
        </>
    )
}

export default UpcomingData