import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Image, Pagination, Tooltip } from 'antd';
import { initial } from '../../../assets/reducer'
import { RiMovie2Line } from "react-icons/ri"
import axios from 'axios'
import "../trending/trending.scss"
import Navbar from "../../navbar/Navbar"
import Footer from "../../footer/Footer"
import showImage from "../../../assets/actor-photo-not-downloaded.jpg"
const API = "https://api.themoviedb.org/3/tv/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Tvshow() {
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
    console.log(currentPage)
    const onChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        document.title = "Cinema App - Movie"
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
                                const { id, poster_path, title } = data
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
                                                fallback={showImage}
                                            />
                                            <div className="trending-movie-info">
                                                <div className="like-and-open">
                                                    <Tooltip placement="top" title={"Mark As Fovorite"} color={"#343434"}>
                                                        <div className='icon'>
                                                            <AiOutlineHeart />
                                                        </div>
                                                    </Tooltip>
                                                    <Link to={`/show/${id}`}>
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
                        <div className='pagination'>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#e6b31e",
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