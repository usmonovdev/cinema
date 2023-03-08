import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { 
    Navbar, Footer, LoadSimilar, LoadPhoto, BannedContent, LoadMovie, MovieRight, 
    MovieLeft, MovieActors, MovieImages, MovieReview, MovieSimilar
} from "../../index";
import axios from "axios"
import "../home/home.scss"
import "./moviesOpen.scss"
import "../movies/moviesOpen.scss"
import "../movies/actors/actors.scss"
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
                    <LoadMovie />
                    <LoadPhoto />
                    <LoadSimilar />
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
                                    <MovieLeft movie={movie} />
                                    <MovieRight movie={movie} />
                                </div>
                            </div>
                        </div>
                        <MovieActors moviesId={moviesId} type="movie" />
                        <MovieImages moviesId={moviesId} type="movie" />
                        <MovieReview moviesId={moviesId} type="movie" />
                        <MovieSimilar moviesId={moviesId} type="movie" />
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