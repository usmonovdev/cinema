import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [movie, setMovie] = useState([])
    // const [loading, setLoading] = useState(true)
    const { moviesId } = useParams()
    console.log(moviesId)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${API_KEY}`)
            .then((res) => {
                setMovie(res.data)
                // setLoading(false)
            })
    }, [moviesId])
    return (
        <MovieContext.Provider value={movie}>
            {children}
        </MovieContext.Provider>
    )
}