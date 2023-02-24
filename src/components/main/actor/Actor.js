import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Image, Pagination } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import axios from 'axios'
import Navbar from "../../navbar/Navbar"
import Footer from "../../footer/Footer"
import actorImage from "../../../assets/actor-photo-not-downloaded.jpg"
import ActorLoad from "../../loading/movie/Movie"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import ImageLoading from "../../loading/image/Image"
import "../trending/trending.scss"
const API = "https://api.themoviedb.org/3/person/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Actor() {
    const { imgState, colorState } = useMovieContext()
    const [actor, setActor] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    // GET THE DATA AND SET CURRENT PAGE
    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}&page=${currentPage}`)
                .then((actor) => {
                    setActor(actor.data)
                    setLoading(false)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [currentPage]);

    // CHANGE PAGE VALUE
    const changePage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        document.title = "Cinema App - Actor"
    }, [])
    return (
        <>
            {loading ? <>
                <ActorLoad />
            </> : <>
                <Navbar />
                <div className='container'>
                    <div className="movies-box">
                        {actor.results?.length !== 0 ?
                            <>
                                <motion.ul
                                    className="trending"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {actor.results?.map((data) => {
                                        const { id, profile_path, title, name, popularity } = data
                                        return (
                                            <motion.li
                                                className="trending-movie-container"
                                                variants={item}
                                                key={id}
                                            >
                                                <div className="trending-movie-box">
                                                    <Image
                                                        preview={false}
                                                        src={`https://image.tmdb.org/t/p/${imgState.size}/${profile_path}`}
                                                        alt={title}
                                                        fallback={actorImage}
                                                        placeholder={
                                                            <ImageLoading />
                                                        }
                                                    />
                                                    <div className="trending-movie-info">
                                                        <div className="like-and-open">
                                                            <div className='icon'>
                                                                <AiOutlineHeart />
                                                            </div>
                                                            <Link to={`/actor/${id}`}>
                                                                <div className='play'>
                                                                    <p>View</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='info'>
                                                    <div className='text-anim actor'>
                                                        <p className={`${name.length > "14" ? "anim" : ""}`}>{name}</p>
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

export default Actor