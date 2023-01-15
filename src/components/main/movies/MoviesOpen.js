import "../home/home.scss"
import "./moviesOpen.scss"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import Navbar from '../../navbar/Navbar'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
// const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

function Movies() {
    const [movie, setMovie] = useState([])
    const { moviesId } = useParams()

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/315162?api_key=${API_KEY}`)
            .then((res) => {
                setMovie(res.data.results)
            })
    }, [])

    // useEffect(() => {
    //     document.title = `Movie - ${movie.original_title}`
    // })

    // const filterMovie = movie.filter(obj => obj.id == moviesId);
    // console.log(filterMovie)
    console.log(movie)
    return (
        <>
            <h1>id: {moviesId}</h1>
            {/* <Navbar />
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
            </>} */}
        </>
    )
}

export default Movies