import React, { useState, useContext, useEffect } from 'react'
import { Image } from 'antd'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import ImageLoading from "../../loading/image/Image"
import movieImage from "../../../assets/movie-photo-not-downloaded.jpg"
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"

function TrendingLike({ data }) {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch, likeMovie, imgState } = useMovieContext()
    const { poster_path, media_type, id, title } = data
    const [removeLike, setRemoveLike] = useState()

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs, loading, error] = useCollectionData(query)
    const like = async (e) => {
        setRemoveLike(true)
        console.log("like")
        const newName = `${e.title == undefined ? e.name : e.title}`
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, newName)
        await setDoc(docRef, {
            c_id: e.id,
            c_name: newName,
            c_media_type: e.media_type,
            c_poster_path: e.poster_path,
            c_vote_average: e.vote_average,
            timestamp: serverTimestamp()
        });
    }

    console.log(likeMovie.localMovie)

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
                    <ImageLoading />
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
                    <Link to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}>
                        <div className='play'>
                            <p>Play</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TrendingLike