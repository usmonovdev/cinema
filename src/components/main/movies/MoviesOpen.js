import "../home/home.scss"
import "./moviesOpen.scss"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import LimitedContent from "../../LimitedContent/LimitedContent"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

function Movies() {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)
    const { moviesId } = useParams()

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${API_KEY}`)
            .then((res) => {
                setMovie(res.data)
                setLoading(false)
            })
    }, [moviesId])

    useEffect(() => {
        if(loading) {
            document.title = `Movie - Loading...`
        } else {
            document.title = `Movie - ${movie.original_title}`
        }
    })

    console.log(movie)
    console.log(loading)
    return (
        <>
            <Navbar />
            {movie.adult ? <>
                <div className="ads">
                    <div className='bg-image' style={{
                        opacity: "1",
                        backgroundImage: `url("${IMAGE_LINK}${movie.backdrop_path}")`
                    }}>
                        <div className="opened-movie-backdrop">
                            <div className="left-info">
                                <img className="poster-image" src={`${IMAGE_LINK}${movie.poster_path}`} alt={movie.original_title} />
                                <div className="open-image"></div>
                            </div>
                            <div className="right-info">
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/">Back</Link>
            </> : <>
                <LimitedContent />
            </>}
        </>
    )
}

export default Movies