import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import "../home/home.scss"
import "./moviesOpen.scss"
import "../movies/moviesOpen.scss"
import "../movies/actors/actors.scss"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import RightInfo from "./rightInfo/RightInfo"
import LeftInfo from "./leftInfo/LeftInfo"
import Footer from "../../footer/Footer"
import Actors from "./actors/Actors"
import MovieImages from "./movieImages/MovieImages"
import Reviews from "./reviews/Reviews"
import Similar from "../similar/Similar"
import MovieLoad from "../../loading/movieOpen/Movie"
import PhotoLoad from "../../loading/photo/Photo"
import SimilarLoad from "../../loading/similar/Similar"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const { imgState } = useMovieContext()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const { moviesId } = useParams()

    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${API_KEY}`)
                .then((data) => {
                    setMovie(data.data)
                    setLoading(false)
                })
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [moviesId])

    const { adult, backdrop_path, title } = movie;

    useEffect(() => {
        if (loading) {
            document.title = `Movie - Loading...`
        } else {
            document.title = `Movie - ${title}`
        }
    });

    return (
        <>
            {loading ?
                <>
                    <MovieLoad />
                    <PhotoLoad />
                    <SimilarLoad />
                </> :
                <>
                    {!adult ? <>
                        <Navbar />
                        <div className="ads movie-info-overflow class-for-actors">
                            <div className='bg-image movies-open-media' style={{
                                opacity: "1",
                                backgroundImage: `url("https://image.tmdb.org/t/p/${imgState.size}/${backdrop_path}")`
                            }}>
                                <div className="opened-movie-backdrop">
                                    <LeftInfo movie={movie} />
                                    <RightInfo movie={movie} />
                                </div>
                            </div>
                        </div>
                        <Actors moviesId={moviesId} type="movie" />
                        <MovieImages moviesId={moviesId} type="movie" />
                        <Reviews moviesId={moviesId} type="movie" />
                        <Similar moviesId={moviesId} type="movie" />
                        <Footer />
                    </> : <>
                        <BannedContent />
                        <Footer />
                    </>
                    }
                </>
            }
        </>
    )
}

export default Movies