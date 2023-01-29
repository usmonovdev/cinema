import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import { useMovieContext } from "../../../context/MovieContex/MovieContex"
import RightInfo from '../tvshow/rightInfo/RightInfo'
import LeftInfo from '../tvshow/leftInfo/LeftInfo'
import Footer from '../../footer/Footer'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
function ShowOpen() {
    const [loading, setLoading] = useState(true)
    const { getMovie, movie } = useMovieContext()
    const { showId } = useParams()
    useEffect(() => {
        getMovie(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`);
        setLoading(false)
    }, [])

    const { adult, backdrop_path, name } = movie;

    useEffect(() => {
        if (loading) {
            document.title = `Movie - Loading...`
        } else {
            document.title = `Movie - ${name}`
        }
    })
    return (
        <>
            {!adult ? <>
                <Navbar />
                <div className="ads movie-info-overflow">
                    <div className='bg-image movies-open-media' style={{
                        opacity: "1",
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`
                    }}>
                        <div className="opened-movie-backdrop">
                            <LeftInfo show={movie} />
                            <RightInfo show={movie} />
                        </div>
                    </div>
                </div>
            </> : <>
                <BannedContent />
            </>}
            <Footer />
        </>
    )
}

export default ShowOpen