import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { PopoverTitleTrending } from "../../../assets/AntD"
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { Image, Tooltip } from 'antd';
import { initial } from '../../../assets/reducer'
import { RiMovie2Line } from "react-icons/ri"
import axios from 'axios'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "../trending/trending.scss"
import MovieData from './MovieData'
import Navbar from "../../navbar/Navbar"
import Footer from "../../footer/Footer"
const API = "https://api.themoviedb.org/3/movie/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}`)
                .then((movie) => {
                    setMovie(movie.data.results)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                {movie.length !== 0 ?
                    <>
                        <motion.ul
                            className="trending"
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            style={{ marginBottom: "50px" }}
                        >
                            {movie.map((data) => {
                                const { id, poster_path, title, media_type } = data
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
                                                alt={title}
                                                fallback={movie}
                                            />
                                            <div className="trending-movie-info">
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
                    </> :
                    <div className="trendingNoItem">
                        <div className='noItems'>
                            <RiMovie2Line />
                            <p>Items not found!</p>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Movies