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
import showImage from "../../../assets/actor-photo-not-downloaded.jpg"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
const API = "https://api.themoviedb.org/3/tv/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Tvshow() {
    const { imgState, colorState } = useMovieContext()
    const [show, setShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}&page=${currentPage}`)
                .then((show) => {
                    setShow(show.data)
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
            <Navbar />
            <div className='container'>
                {show.results?.length !== 0 ?
                    <>
                        <motion.ul
                            className="trending"
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            style={{ marginBottom: "50px" }}
                        >
                            {show.results?.map((data) => {
                                const { id, poster_path, name, vote_average } = data
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
                                                alt={name}
                                                fallback={showImage}
                                            />
                                            <div className="trending-movie-info">
                                                <div className="like-and-open">
                                                    <div className='icon'>
                                                        <AiOutlineHeart />
                                                    </div>
                                                    <Link to={`/show/${id}`}>
                                                        <div className='play'>
                                                            <p>Play</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
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
                                        colorTextBase: "#fff",
                                        borderRadius: "0"
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
            <Footer />
        </>
    )
}

export default Tvshow