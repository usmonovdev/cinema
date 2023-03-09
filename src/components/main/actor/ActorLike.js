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

function ActorLike({ data }) {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch, imgState } = useMovieContext()
    const { profile_path, id, title } = data
    const [removeLike, setRemoveLike] = useState(false)

    const [messageApi, contextHolder] = message.useMessage()

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs] = useCollectionData(query)
    const like = async (e) => {
        if (currentUser !== null) {
            setRemoveLike(true)
            const docRef = doc(db, `likes/${currentUser?.uid}/children`, e.name)
            await setDoc(docRef, {
                c_id: e.id,
                c_name: e.name,
                c_media_type: "actor",
                c_poster_path: e.profile_path,
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
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, e.name)
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
            {contextHolder}
            <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/${imgState.size}/${profile_path}`}
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
                    <Link to={`/actor/${id}`}>
                        <div className='play'>
                            <p>Play</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ActorLike