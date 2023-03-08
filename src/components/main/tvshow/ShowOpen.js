import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { 
    Navbar, Footer, BannedContent, TvRightInfo, TvLeftInfo, TvReviews, 
    TvImages, TvActors, TvSimilar, LoadSimilar, LoadMovie, LoadPhoto 
} from "../../index"
import axios from 'axios'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function ShowOpen() {
    const { imgState } = useMovieContext()
    const [show, setShow] = useState([])
    const [loading, setLoading] = useState(true)
    const { showId } = useParams()

    // GET THE DATA BY SHOW ID
    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`)
                .then((data) => {
                    setShow(data.data)
                    setLoading(false)
                })
        } catch (error) {
            console.log("Api error")
        }
    }, [showId])

    const { adult, backdrop_path, name } = show;

    // LOADING TEXT WITH TITLE
    useEffect(() => {
        if (loading) {
            document.title = `Movie - Loading...`
        } else {
            document.title = `Movie - ${name}`
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
                                    <TvLeftInfo show={show} />
                                    <TvRightInfo show={show} />
                                </div>
                            </div>
                        </div>
                        <TvActors moviesId={showId} type="tv" />
                        <TvImages moviesId={showId} type="tv" />
                        <TvReviews moviesId={showId} type="tv" />
                        <TvSimilar moviesId={showId} type="tv" />
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

export default ShowOpen