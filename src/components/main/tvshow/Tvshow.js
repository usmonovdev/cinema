import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Pagination } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { Navbar, Footer, LoadAllMovies, TvLiked, TvAllLike } from "../../index"
import axios from 'axios'
import "../trending/trending.scss"
const API = "https://api.themoviedb.org/3/tv/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Tvshow() {
    const { colorState } = useMovieContext()
    const [show, setShow] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}&page=${currentPage}`)
                .then((show) => {
                    setShow(show.data)
                    setLoading(false)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [currentPage]);

    const onChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        document.title = "Cinema App - Tv"
    }, []);
    return (
        <>
            {loading ?
                <>
                    <LoadAllMovies />
                </> : <>
                    <Navbar />
                    <TvLiked />
                    <div className='container'>
                        <div className="movies-box">
                            <div className="title-info">
                                <h1><span>#</span>All Tv Shows</h1>
                                <p>+ 145 000 tv movies</p>
                            </div>
                            {show.results?.length !== 0 ?
                                <>
                                    <motion.ul
                                        className="trending"
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {show.results?.map((data) => {
                                            const { id, name, vote_average } = data
                                            return (
                                                <motion.li
                                                    className="trending-movie-container"
                                                    variants={item}
                                                    key={id}
                                                >
                                                    <TvAllLike data={data}/>
                                                    <div className='info'>
                                                        <div className='text-anim'>
                                                            <p className={`${name?.length > "10" ? "anim" : ""}`}>{name}</p>
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
                                                onChange={onChange}
                                                defaultCurrent={1}
                                                total={50}
                                                pageSize={1}
                                                showLessItems={false}
                                            />
                                        </ConfigProvider>
                                    </div>
                                </> :
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

export default Tvshow