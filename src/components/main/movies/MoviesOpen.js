import React, { useEffect, useState } from 'react'
import "../home/home.scss"
import "./moviesOpen.scss"
import "../movies/moviesOpen.scss"
import "../movies/actors/actors.scss"
import { useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import RightInfo from "./rightInfo/RightInfo"
import LeftInfo from "./leftInfo/LeftInfo"
import Footer from "../../footer/Footer"
import Actors from "./actors/Actors"
import MoviesOpen from "../../loading/moviesOpen/MoviesOpen"
import MovieImages from "./movieImages/MovieImages"
import Reviews from "./reviews/Reviews"
import Similar from "../similar/Similar"
import axios from "axios"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
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
                })
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [moviesId])

    const { adult, backdrop_path, title } = movie;

    useEffect(() => {
        document.title = `Movie - ${title}`
    });

    return (
        <>
            {!adult ? <>
                {loading ? <>
                    <Navbar />
                    <div className="ads movie-info-overflow class-for-actors">
                        <div className='bg-image movies-open-media' style={{
                            opacity: "1",
                            backgroundImage: `url("https://image.tmdb.org/t/p/${imgState.size}/${backdrop_path}")`
                        }}>
                            <div className="opened-movie-backdrop">
                                <LeftInfo movie={movie} />
                                <RightInfo movie={movie}/>
                            </div>
                        </div>
                    </div>
                    <Actors moviesId={moviesId} type="movie" />
                    <MovieImages moviesId={moviesId} type="movie" />
                    <Reviews moviesId={moviesId} type="movie" />
                    <Similar moviesId={moviesId}  type="movie" />
                    <Footer />
                </> :
                    <>
                        <Navbar />
                        <MoviesOpen />
                    </>}
            </> : <>
                <BannedContent />
                <Footer />
            </>
            }
        </>
    )
}

export default Movies