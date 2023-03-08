import React, { useReducer } from 'react'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { RiMovie2Line } from "react-icons/ri"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slice } from 'lodash';
import actor from "../../../assets/actor-photo-not-downloaded.jpg"
import { container, item } from '../../../assets/Framer'
import { reducer } from "../../../assets/reducer"
import { Image } from 'antd'
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import ImageLoading from "../../loading/image/Image"
import SimilarLike from "./SimilarLike"

function SimilarData({ filter }) {
    const { imgState } = useMovieContext()

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
        }, 3900);

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
                            const { id, poster_path, title, media_type, vote_average } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <SimilarLike data={data}/>
                                    {/* <div className="trending-movie-box">
                                        <Image
                                            preview={false}
                                            src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                                            alt={title}
                                            fallback={actor}
                                            placeholder={
                                                <ImageLoading />
                                            }
                                        />
                                        <div className="trending-movie-info">
                                            <div className="like-and-open">
                                                <div className='icon'>
                                                    <AiOutlineHeart />
                                                </div>
                                                <Link
                                                    to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}
                                                >
                                                    <div className='play'>
                                                        <p>Play</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className='info'>
                                        <div className='text-anim'>
                                            <p className={`${title?.length > "10" ? "anim" : ""}`}>{title}</p>
                                        </div>
                                        <div className='vote'>
                                            <AiFillStar /> {vote_average}
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

export default SimilarData