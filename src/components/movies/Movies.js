import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const [movie, setMovie] = useState()
    const param = useParams()
    // console.log(param.moviesId)
    // const  = useParams()
    const URL = `https://api.themoviedb.org/3/movie/${param.moviesId}?api_key=${API_KEY}`;

    useEffect(() => {
        axios.get(URL).then(data => {
            setMovie(data.data)
            console.log(data.data);
        })
    }, [])
    return (
        <div>
            {/* <h1>{movie.name}</h1> */}
            <Link to="/">Back</Link>
        </div>
    )
}

export default Movies