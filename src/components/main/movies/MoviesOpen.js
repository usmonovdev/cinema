import "../home/home.scss"
import "./moviesOpen.scss"
import "../movies/moviesOpen.scss"
import "../movies/actors/actors.scss"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import RightInfo from "./rightInfo/RightInfo"
import LeftInfo from "./leftInfo/LeftInfo"
import { useMovieContext } from "../../../context/MovieContex/MovieContex"
import Footer from "../../footer/Footer"
import Actors from "./actors/Actors"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
function Movies() {
    const [loading, setLoading] = useState(true)
    const { getMovie, movie } = useMovieContext()
    const { moviesId } = useParams()

    useEffect(() => {
        getMovie(`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${API_KEY}`);
        setLoading(false)
    }, [])

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
            {!adult ? <>
                <Navbar />
                <div className="ads movie-info-overflow class-for-actors">
                    <div className='bg-image movies-open-media' style={{
                        opacity: "1",
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`
                    }}>
                        <div className="opened-movie-backdrop">
                            <LeftInfo movie={movie} />
                            <RightInfo movie={movie} moviesId={moviesId}/>
                        </div>
                    </div>
                </div>
                <Actors moviesId={moviesId} />
            </> : <>
                <BannedContent />
            </>}
            <Footer />
        </>
    )
}

export default Movies