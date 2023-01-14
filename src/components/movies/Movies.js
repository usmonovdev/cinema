import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Movies() {
    const [movie, setMovie] = useState({ title: {} })
    const {id} = useParams()

    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            {/* <h1>{movie.name}</h1> */}
            <Link to="/">Back</Link>
        </div>
    )
}

export default Movies