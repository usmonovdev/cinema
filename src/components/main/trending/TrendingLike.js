import React, { useState, useContext } from 'react'
import { Image } from 'antd'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import ImageLoading from "../../loading/image/Image"
import movieImage from "../../../assets/movie-photo-not-downloaded.jpg"
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"

function TrendingLike({ data }) {
    const { currentUser } = useContext(AuthContext)
    const { poster_path, media_type, id, title } = data
    const { imgState } = useMovieContext()
    const [addLike, setAddLike] = useState(false)

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs, loading, error] = useCollectionData(query)
    const like = async (e) => {
        const newName = `${e.title == undefined ? e.name : e.title}`
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, newName)
        await setDoc(docRef, {
            id: e.id,
            name: newName,
            media_type: e.media_type,
            poster_path: e.poster_path,
            vote_average: e.vote_average,
            timestamp: serverTimestamp()
        })
    }
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
                    <div className='icon' onClick={() => like(data)}>
                        {addLike ? <AiFillHeart /> : <AiOutlineHeart />}
                    </div>
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