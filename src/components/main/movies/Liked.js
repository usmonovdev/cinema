import React, { useEffect, useContext } from 'react'
import { container, item } from '../../../assets/Framer'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { motion } from 'framer-motion'
import { Image } from 'antd'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { LoadImage } from "../../index"
import movie from "../../../assets/movie-photo-not-downloaded.jpg"
import "./liked.scss"

function Liked() {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch, likeMovie, imgState } = useMovieContext()

    const filter = likeMovie.localMovie?.filter((data) => data.c_media_type == "movie");

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs] = useCollectionData(query)
    const deleteLike = async (e) => {
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, e)
        await deleteDoc(docRef);
    }

    useEffect(() => {
        likeMovieDispatch({
            type: "LIKE",
            newLocalMovie: docs
        });
    }, [docs])

    return (
        <>
            {filter?.length > 0 ?
                <div className='container'>
                    <div
                        className="movies-box"
                        style={{ margin: "0 0 30px 0" }}
                    >
                        <div className="title-info">
                            <h1><span>#</span>Liked</h1>
                            <p>You liked these movies <span>{filter.length}</span></p>
                        </div>
                        <motion.ul
                            className="trending"
                            variants={container}
                            initial="hidden"
                            animate="visible"
                        >
                            {filter?.map((data) => {
                                const { c_id, c_poster_path, c_vote_average, c_name } = data
                                return (
                                    <motion.li
                                        className="trending-movie-container"
                                        variants={item}
                                        key={c_id}
                                    >
                                        <div className="trending-movie-box">
                                            <Image
                                                preview={false}
                                                src={`https://image.tmdb.org/t/p/${imgState.size}/${c_poster_path}`}
                                                alt={c_name}
                                                fallback={movie}
                                                placeholder={
                                                    <LoadImage />
                                                }
                                            />
                                            <div className="trending-movie-info">
                                                <div className="like-and-open">
                                                    <div className='icon' onClick={() => deleteLike(c_name)}>
                                                        <MdDeleteOutline />
                                                    </div>
                                                    <Link to={`/movie/${c_id}`}>
                                                        <div className='play'>
                                                            <p>Play</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='text-anim'>
                                                <p className={`${c_name.length > "10" ? "anim" : ""}`}>{c_name}</p>
                                            </div>
                                            <div className='vote'>
                                                <AiFillStar />
                                                <p>{c_vote_average.toString()?.slice(0, 3)}</p>
                                            </div>
                                        </div>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </div>
                </div>
                : ""}
        </>
    )
}

export default Liked