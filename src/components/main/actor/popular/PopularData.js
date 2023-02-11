import React from 'react'
import { useReducer } from 'react'
import { initial, reducer } from '../../../../assets/reducer'
import { motion } from 'framer-motion'
import { slice } from 'lodash'
import { container, item } from '../../../../assets/Framer'
import { Image } from 'antd'
import { RiMovie2Line } from 'react-icons/ri'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

function PopularData({ popular }) {
    const initialState = {
        completed: false,
        index: 4,
        loading: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const actor = slice(popular, 0, state.index)

    const loadMore = () => {
        dispatch({ type: "LOADING" })

        setTimeout(() => {
            dispatch({ type: "LOAD_MORE" })
            dispatch({ type: "LOADING_FALSE" })
        }, 5000);

        if (state.index >= 16 || actor.length < 3) {
            dispatch({ type: "IS_COMPLETED" })
        }
    }
    return (
        <div className='popular-data'>
            {actor?.length !== 0 ?
                <>
                    <motion.ul
                        className={`trending ${state.completed ? "complete" : ""}`}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {actor?.map((data) => {
                            const { id, profile_path, name } = data
                            return (
                                <motion.li
                                    className="trending-movie-container"
                                    variants={item}
                                    key={id}
                                >
                                    <Link 
                                        to={`/actor/${id}`}
                                        style={{textDecoration: "none"}}
                                    >
                                        <div className="actor">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/${initial.size}/${profile_path}`}
                                                alt={name}
                                                preview={false}
                                            />
                                            <p>{name}</p>
                                        </div>
                                    </Link>

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
                        style={{ marginBottom: "50px" }}
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
        </div>
    )
}

export default PopularData