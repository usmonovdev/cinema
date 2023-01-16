import "../home/home.scss"
import "./moviesOpen.scss"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import RightInfo from "./rightInfo/RightInfo"
import LeftInfo from "./leftInfo/LeftInfo"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

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
        if (loading) {
            document.title = `Movie - Loading...`
        } else {
            document.title = `Movie - ${movie.original_title}`
        }
    })
    console.log(movie)
    return (
        <>
            {!movie.adult ? <>
                <Navbar />
                <div className="ads">
                    <div className='bg-image' style={{
                        opacity: "1",
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                    }}>
                        <div className="opened-movie-backdrop">
                            <LeftInfo movie={movie} />
                            <RightInfo movie={movie} />
                        </div>
                    </div>
                </div>
                <Link to="/">Back</Link>
            </> : <>
                <BannedContent />
            </>}
        </>
    )
}

export default Movies