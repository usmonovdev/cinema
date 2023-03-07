import React, { useReducer } from 'react'
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { RiMovie2Line } from "react-icons/ri"
import { container, item } from '../../../assets/Framer'
import { reducer } from '../../../assets/reducer';
import { slice } from 'lodash';
import TopRatedLike from "./TopRatedLike";

function TopRatedData({ filter }) {
    // INITIAL STATE THE TOP RATED MOVIES
    const initialState = {
        completed: false,
        index: 4,
        loading: false
    };

    const [state, dispatch] = useReducer(reducer, initialState)
    const initialPosts = slice(filter, 0, state.index)

    // LOAD MORE FUNCTION
    const loadMore = () => {
        dispatch({ type: "LOADING" })

        setTimeout(() => {
            dispatch({ type: "LOAD_MORE" })
            dispatch({ type: "LOADING_FALSE" })
        }, 3900);

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
                        {initialPosts.map((data) => {
                            const { id, title, vote_average } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <TopRatedLike data={data}/>
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

export default TopRatedData