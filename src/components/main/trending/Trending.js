import { Spin, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdSettingsInputComposite } from "react-icons/md"
import { GoSettings } from "react-icons/go"
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { BiChevronRightCircle } from "react-icons/bi"
import { GiSettingsKnobs } from "react-icons/gi"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./trending.scss"
import { Link } from 'react-router-dom';
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500/"

function Trending() {
    const antIcon = (
        <LoadingOutlined
            style={{ fontSize: 24 }}
            spin
        />
    );
    const { getMovie, movie } = useMovieContext()
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const [loading, setLoading] = useState(false)
    const initialPosts = slice(movie.results, 0, index)
    const getData = () => {
        getMovie(`${API}${API_KEY}`)
    }

    console.log(movie)

    const loadMore = () => {
        setLoading(true)
        setInterval(() => {
            setIndex(index + 4)
            setLoading(false)
        }, 3000);
        if (index >= 16) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='container'>
            <div className="title-settings-box">
                <h1 className='title'><span className='sharp'>#</span> Trending</h1>
                <Tooltip placement="top" title={"Filter Trending Movies"} color={"#343434"}>
                    <GiSettingsKnobs />
                </Tooltip>
            </div>
            <div className="trending">
                {initialPosts.map((data) => {
                    const { id, poster_path, first_air_date, name, original_title, vote_average, overview, release_date } = data
                    return (
                        <div className="trending-movie-container"
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
                                        <Link to={`/movies/${id}`}>
                                            <div className='play'>
                                                <p>Play</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isCompleted ? "" :
                <button className='load-more' onClick={loadMore}>
                    {loading ? <Spin indicator={antIcon} /> : <><p>Load More</p><MdOutlineKeyboardArrowDown className='load-icon' /></>}
                </button>
            }
        </div>
    )
}

export default Trending