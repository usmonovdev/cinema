import React, { useEffect, useState } from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { useParams } from 'react-router-dom'
import { Image } from 'antd'
import axios from 'axios'
import Footer from "../../footer/Footer"
import Navbar from '../../navbar/Navbar'
import Right from './Right'
import Popular from './popular/Popular'
import notDownloaded from "../../../assets/actor-photo-not-downloaded.jpg"
import ActorLoader from "../../loading/movieOpen/Movie"
import SimilarLoader from "../../loading/similar/Similar"
import ImageLoading from "../../loading/image/Image"
import "./actors.scss"

function ActorOpen() {
    const { imgState } = useMovieContext()
    const { actorId } = useParams()
    const API = "https://api.themoviedb.org/3/person/"
    const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
    const [actor, setActor] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            axios.get(`${API}${actorId}?api_key=${API_KEY}`)
                .then((data) => {
                    setActor(data.data)
                    setLoading(false)
                })
        } catch (error) {
            console.log("API Error", error)
        }
    }, [actorId])

    const { profile_path } = actor

    return (
        <div>
            {loading ? <>
                <ActorLoader />
                <SimilarLoader/>
            </> : <>
                <Navbar />
                <div className="bg-image"
                    style={{
                        opacity: "1",
                        backgroundImage: `url("https://image.tmdb.org/t/p/${imgState.size}/${profile_path}")`
                    }}
                >
                    <div className="bg-color">
                        <div className='container'>
                            <div className="actor-box">
                                <div className="left">
                                    <Image
                                        width="100px"
                                        src={`https://image.tmdb.org/t/p/${imgState.size}/${profile_path}`}
                                        fallback={notDownloaded}
                                        placeholder={
                                            <ImageLoading />
                                        }
                                    />
                                </div>
                                <Right actor={actor} />
                            </div>
                        </div>
                    </div>
                </div>
                <Popular />
                <Footer />
            </>}
        </div>
    )
}

export default ActorOpen