import "../home/home.scss"
import "./moviesOpen.scss"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

function Movies() {
    const [movie, setMovie] = useState([])
    const param = useParams()

    useEffect(() => {
        const fetchMovie = () => {
            axios.get(`https://api.themoviedb.org/3/movie/${param.moviesId}?api_key=${API_KEY}`).then(data => {
                setMovie(data.data)
                console.log(data.data);
            })
        }
        fetchMovie();
    }, [])

    useEffect(() => {
        document.title = `Movie - ${movie.original_title}`
    })

    return (
        <>
            <Navbar />
            {!movie.adult ? <>
                <div className="ads">
                    <div className='bg-image' style={{
                        opacity: "1",
                        backgroundImage: `url(${IMAGE_LINK}${movie.backdrop_path})`
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
                <div className="cencored-content">
                    <h1>sdasda</h1>
                    <Link to="/">Back</Link>
                </div>
            </>}
        </>
    )
}

export default Movies