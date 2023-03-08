import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Pagination } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { Navbar, Footer } from "../../index"
import MovieLoad from '../../loading/movie/Movie';
import axios from 'axios'
import Liked from './Liked';
import AllMoviesLike from './AllMoviesLike';
import "../trending/trending.scss"
import "./liked.scss"
const API = "https://api.themoviedb.org/3/movie/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const { colorState } = useMovieContext()
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
                <Liked />
                <div className='container'>
                    <div
                        className="movies-box"
                        style={{ marginTop: "0px" }}
                    >
                        <div className="title-info">
                            <h1><span>#</span>All Movies</h1>
                            <p>+ 500 000 movies</p>
                        </div>
                        {movie.results?.length !== 0 ?
                            <>
                                <motion.ul
                                    className="trending"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {movie.results?.map((data) => {
                                        const { id, title, vote_average } = data
                                        return (
                                            <motion.li
                                                className="trending-movie-container"
                                                variants={item}
                                                key={id}
                                            >
                                                <AllMoviesLike data={data}/>
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
                                                colorTextBase: "#fff"
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