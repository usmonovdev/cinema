import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { container, item } from '../../../assets/Framer'
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { Image } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { reducer } from '../../../assets/reducer';
import { slice } from 'lodash';
import movie from "../../../assets/actor-photo-not-downloaded.jpg"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import ImageLoading from "../../loading/image/Image"

function TrendingData({ filter }) {
    const { imgState } = useMovieContext()
    const initialState = {
        completed: false,
        index: 4,
        loading: false,
        // like: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [addLike, setAddLike] = useState(false)

    // console.log("like", state.like)
    const like = (e) => {
        setAddLike(!addLike)
        console.log(e)
    }
    // SLICE THE FILTERED MOVIES USING STATE.INDEX
    const initialPosts = slice(filter, 0, state.index)

    // LOAD MORE FUNCTION FOR OPEN NEW MOVIES
    const loadMore = () => {
        dispatch({ type: "LOADING" })

        setTimeout(() => {
            dispatch({ type: "LOAD_MORE" })
            dispatch({ type: "LOADING_FALSE" })
        }, 3000);

        if (state.index >= 16 || initialPosts.length < 3) {
            dispatch({ type: "IS_COMPLETED" })
        }
    };

    return (
        <>
            {initialPosts.length !== 0 ?
                <>
                    <motion.ul
                        className="trending"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {initialPosts?.map((data) => {
                            const { id, poster_path, title, name, media_type, vote_average } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <div className="trending-movie-box">
                                        <Image
                                            preview={false}
                                            src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                                            alt={title}
                                            fallback={movie}
                                            placeholder={
                                                <ImageLoading />
                                            }
                                        />
                                        <div className="trending-movie-info">
                                            <div className="like-and-open">
                                                <div className='icon' onClick={() => like(id)}>
                                                    {addLike ? <AiFillHeart/> : <AiOutlineHeart/>}
                                                    {/* <AiOutlineHeart /> */}
                                                    {/* <AiFillHeart/> */}
                                                </div>
                                                <Link to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}>
                                                    <div className='play'>
                                                        <p>Play</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='info'>
                                        <div className='text-anim'>
                                            <p className={`${title?.length > "10" || name?.length > "10" ? "anim" : ""}`}>{title ? title : name}</p>
                                        </div>
                                        <div className='vote'>
                                            <AiFillStar />
                                            <p>{vote_average.toString()?.slice(0, 3)}</p>
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
                    <button
                        className='load-more'
                        onClick={loadMore}
                    >
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

export default TrendingData