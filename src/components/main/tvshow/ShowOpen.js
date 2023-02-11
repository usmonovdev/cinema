import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import BannedContent from "../../BannedContent/BannedContent"
import RightInfo from '../tvshow/rightInfo/RightInfo'
import LeftInfo from '../tvshow/leftInfo/LeftInfo'
import Footer from '../../footer/Footer'
import Reviews from '../movies/reviews/Reviews'
import MovieImages from '../movies/movieImages/MovieImages'
import Actors from '../movies/actors/Actors'
import Similar from '../similar/Similar'
import { initial } from '../../../assets/reducer'
import axios from 'axios'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
function ShowOpen() {
    const [show, setShow] = useState([])
    const [loading, setLoading] = useState(true)
    const { showId } = useParams()
    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`)
            .then((data) => {
                setShow(data.data)
                setLoading(false)
            })
        } catch (error) {
            console.log("Api error", error)
        }
    }, [showId])

    const { adult, backdrop_path, name } = show;

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
                <div className="ads movie-info-overflow class-for-actors">
                    <div className='bg-image movies-open-media' style={{
                        opacity: "1",
                        backgroundImage: `url("https://image.tmdb.org/t/p/${initial.size}/${backdrop_path}")`
                    }}>
                        <div className="opened-movie-backdrop">
                            <LeftInfo show={show} />
                            <RightInfo show={show} />
                        </div>
                    </div>
                </div>
                <Actors moviesId={showId} type="tv" />
                <MovieImages moviesId={showId} type="tv" />
                <Reviews moviesId={showId} type="tv" />
                <Similar moviesId={showId}  type="tv" />
                <Footer />
            </> : <>
                <BannedContent />
                <Footer />
            </>}
        </>
    )
}

export default ShowOpen