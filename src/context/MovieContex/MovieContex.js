import axios from "axios";
import { createContext, useContext, useState } from "react"

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movie, setMovie] = useState([]);

    // Get Single Movie by APi and id
    const getMovie = (url) => {
        try {
            axios.get(url)
                .then((movie) => {
                    setMovie(movie.data)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }

    return (
        <MovieContext.Provider value={{ movie, getMovie }}>
            {children}
        </MovieContext.Provider>
    )
}

// Custom Hook
const useMovieContext = () => {
    return useContext(MovieContext)
}

// Export Context's
export { MovieContext, MovieContextProvider, useMovieContext }