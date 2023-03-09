import React, { useState, useContext, useEffect } from 'react'
import { Image, message } from 'antd'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { LoadImage } from '../../index'
import movieImage from "../../../assets/movie-photo-not-downloaded.jpg"

function TrendingLike({ data }) {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch, imgState } = useMovieContext()
    
    const [messageApi, contextHolder] = message.useMessage()
    const { poster_path, media_type, id, title } = data
    const [removeLike, setRemoveLike] = useState(false)

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs] = useCollectionData(query)
    const like = async (e) => {
        // IF NOT USER NAVIGATE TO REGISTER PAGE FUNCTION
        if (currentUser !== null) {
            setRemoveLike(true)
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
        } else {
            messageApi.open({
                type: "error",
                content: "You not user! Register now!",
                duration: 4
            })
        }
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
        <>
            {contextHolder}
            <div className="trending-movie-box">
                <Image
                    preview={false}
                    src={`https://image.tmdb.org/t/p/${imgState.size}/${poster_path}`}
                    alt={title}
                    fallback={movieImage}
                    width="100%"
                    height="100%"
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
                        <Link to={`/${media_type == "movie" ? "movie" : "show"}/${id}`}>
                            <div className='play'>
                                <p>Play</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingLike