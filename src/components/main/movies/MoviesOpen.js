import "../home/home.scss"
import "./moviesOpen.scss"
import "../movies/moviesOpen.scss"
import "../movies/actors/actors.scss"
import React, { useEffect, useState } from 'react'
import { useMovieContext } from "../../../context/MovieContex/MovieContex"
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
import { initial } from "../../../assets/reducer"
import axios from "axios"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState([])
    // const { getMovie, movie } = useMovieContext()
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
    }, [])

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
                            backgroundImage: `url("https://image.tmdb.org/t/p/${initial.size}/${backdrop_path}")`
                        }}>
                            <div className="opened-movie-backdrop">
                                <LeftInfo movie={movie} />
                                <RightInfo movie={movie} moviesId={moviesId} />
                            </div>
                        </div>
                    </div>
                    <Actors moviesId={moviesId} />
                    <MovieImages moviesId={moviesId} />
                    <Reviews moviesId={moviesId} />
                    <Similar moviesId={moviesId} />
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