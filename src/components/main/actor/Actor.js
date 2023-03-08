import React, { useEffect, useState } from 'react'
import { container, item } from '../../../assets/Framer'
import { motion } from 'framer-motion';
import { ConfigProvider, Pagination } from 'antd';
import { RiMovie2Line } from "react-icons/ri"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { Navbar, Footer, LoadAllMovies, ActorLike, ActorLiked } from "../../index"
import axios from 'axios'
import "../trending/trending.scss"
// import "../similar/trending.scss"
import "../movies/liked.scss"
const API = "https://api.themoviedb.org/3/person/popular?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Actor() {
    const { colorState } = useMovieContext()
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
                <LoadAllMovies />
            </> : <>
                <Navbar />
                <ActorLiked />
                <div className='container'>
                    <div className="movies-box">
                        <div className="title-info">
                            <h1><span>#</span>All Actors</h1>
                            <p>+ 10 000 actors</p>
                        </div>
                        {actor.results?.length !== 0 ?
                            <>
                                <motion.ul
                                    className="trending"
                                    variants={container}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {actor.results?.map((data) => {
                                        const { id, name } = data
                                        return (
                                            <motion.li
                                                className="trending-movie-container"
                                                variants={item}
                                                key={id}
                                            >
                                                <ActorLike data={data} />
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