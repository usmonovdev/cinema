import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Image, Pagination } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import axios from 'axios'
import "../trending/trending.scss"
import Navbar from "../../navbar/Navbar"
import Footer from "../../footer/Footer"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import MovieLoad from '../../loading/movie/Movie';
import ImageLoading from "../../loading/image/Image"
const API = "https://api.themoviedb.org/3/movie/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const { imgState, colorState } = useMovieContext()
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}&page=${currentPage}`)
                .then((movie) => {
                    setMovie(movie.data)
                    setLoading(false)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [currentPage]);

    // CHANGE CURENT PAGE DATA'S
    const changePage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        document.title = "Cinema App - Movie"
    }, [])
    return (
        <>
            {loading ? <>
                <MovieLoad />
            </> : <>
                <Navbar />
                <div className='container'>
                    <div 
                        className="movies-box"
                        style={{ marginTop: "0px" }}
                    >
                        {movie.results?.length !== 0 ?
                            <>
                                <motion.ul
                                    className="trending"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {movie.results?.map((data) => {
                                        const { id, poster_path, title, vote_average } = data
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
                                                            <div className='icon'>
                                                                <AiOutlineHeart />
                                                            </div>
                                                            <Link to={`/movie/${id}`}>
                                                                <div className='play'>
                                                                    <p>Play</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='info'>
                                                    <div className='text-anim'>
                                                        <p className={`${title.length > "10" ? "anim" : ""}`}>{title}</p>
                                                    </div>
                                                    <div className='vote'>
                                                        <AiFillStar /> {vote_average}
                                                    </div>
                                                </div>
                                            </motion.li>
                                        )
                                    })}
                                </motion.ul>
                                <div className='pagination'>
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorPrimary: colorState.color,
                                                colorTextBase: "#fff",
                                                borderRadius: "0"
                                            }
                                        }}
                                    >
                                        <Pagination
                                            onChange={changePage}
                                            defaultCurrent={1}
                                            total={50}
                                            pageSize={1}
                                            showLessItems={false}
                                        />
                                    </ConfigProvider>
                                </div>
                            </>
                            :
                            <div className="trendingNoItem">
                                <div className='noItems'>
                                    <RiMovie2Line />
                                    <p>Items not found!</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </>}
        </>
    )
}

export default Movies