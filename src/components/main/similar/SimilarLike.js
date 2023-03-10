import React, { useState, useContext, useEffect } from 'react'
import { Image } from 'antd'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { LoadImage } from "../../index"
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"
import movieImage from "../../../assets/movie-photo-not-downloaded.jpg"

function SimilarLike({ data }) {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch, imgState } = useMovieContext()
    const { poster_path, id, title } = data
    const [removeLike, setRemoveLike] = useState(false)

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs] = useCollectionData(query)
    const like = async (e) => {
        setRemoveLike(true)
        const newName = `${e.title == undefined ? e.name : e.title}`
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, newName)
        await setDoc(docRef, {
            c_id: e.id,
            c_name: newName,
            c_media_type: "movie",
            c_poster_path: e.poster_path,
            c_vote_average: e.vote_average,
            timestamp: serverTimestamp()
        });
    }

    const deleteLike = async (e) => {
        setRemoveLike(false)
        const newName = `${e.title == undefined ? e.name : e.title}`
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, newName)
        await deleteDoc(docRef);
    }

    useEffect(() => {
        likeMovieDispatch({
            type: "LIKE",
            newLocalMovie: docs
        });
    }, [docs])

    return (
        <div className="trending-movie-box">
            <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                alt={title}
                fallback={movieImage}
                placeholder={
                    <LoadImage />
                }
            />
            <div className="trending-movie-info">
                <div className="like-and-open">
                    {removeLike ?
                        <div className='icon' onClick={() => deleteLike(data)}>
                            <AiFillHeart />
                        </div>
                        :
                        <div className='icon' onClick={() => like(data)}>
                            <AiOutlineHeart />
                        </div>
                    }
                    <Link to={`/movie/${id}`}>
                        <div className='play'>
                            <p>Play</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SimilarLike