import axios from "axios";
import { createContext, useContext, useState } from "react"

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movie, setMovie] = useState([]);
    // state for filter #trending
    const [filterValueInMediaType, setFilterValueInMediaType] = useState("all")
    const [filterValueInLang, setFilterValueInLang] = useState("all")
    const [filterValueInStar, setFilterValueInStar] = useState("all")
    const [loadingApi, setLoadingApi] = useState(true)

    // Get Single Movie by APi and id
    const getMovie = (url) => {
        try {
            axios.get(url)
                .then((movie) => {
                    setMovie(movie.data)
                    setLoadingApi(false)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }

    return (
        <MovieContext.Provider
            value={{ 
                movie,
                loadingApi,
                getMovie,
                filterValueInMediaType,
                setFilterValueInMediaType,
                filterValueInLang,
                setFilterValueInLang,
                filterValueInStar,
                setFilterValueInStar }}
            >
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