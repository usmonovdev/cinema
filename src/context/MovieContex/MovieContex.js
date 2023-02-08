import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react"
import { initial, reducer } from "../../assets/reducer";

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movie, setMovie] = useState([]);
    // state for filter #trending
    const [trendingState, trendingDispatch] = useReducer(reducer, initial)
    const [topState, topDispatch] = useReducer(reducer, initial)
    const [upState, upDispatch] = useReducer(reducer, initial)
    // load more state
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const [upcomingIndex, setUpcomingIndex] = useState(4)
    // show all info
    const [info, setInfo] = useState(false)
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
                isCompleted,
                setIsCompleted,
                index,
                setIndex,
                info,
                setInfo,
                upcomingIndex,
                setUpcomingIndex,
                trendingState,
                trendingDispatch,
                topState,
                topDispatch,
                upState,
                upDispatch
            }}
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