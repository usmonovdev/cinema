import { createContext, useContext, useReducer, useState } from "react"
import { initial, reducer } from "../../assets/reducer";
import axios from "axios";

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movie, setMovie] = useState([]);
    // STATE FOR #TRENDING
    const [trendingState, trendingDispatch] = useReducer(reducer, initial)
    const [topState, topDispatch] = useReducer(reducer, initial)
    const [upState, upDispatch] = useReducer(reducer, initial)
    const [simState, simDispatch] = useReducer(reducer, initial)

    // STATE FOR IMAGE STATE SETTINGS
    const [imgState, imgDispatch] = useReducer(reducer, initial)

    // STATE FOR SLIDER SPEED SETTINGS
    const [speedState, speedDispatch] = useReducer(reducer, initial)

    // STATE FOR THEME SETTINGS 
    const [colorState, colorDispatch] = useReducer(reducer, initial)

    // STATE FOR LIKED MOVIES
    const [likeMovie, likeMovieDispatch] = useReducer(reducer, initial)

    // GET SINGLE MOVIE BY API AND ID
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
        <MovieContext.Provider
            value={{
                movie,
                getMovie,
                trendingState,
                trendingDispatch,
                topState,
                topDispatch,
                upState,
                upDispatch,
                simState,
                simDispatch,
                imgState,
                imgDispatch,
                colorState,
                colorDispatch,
                speedState,
                speedDispatch,
                likeMovie,
                likeMovieDispatch
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}

// CUSTOM HOOK
const useMovieContext = () => {
    return useContext(MovieContext)
}

// EXPORT CONTEXT'S
export { MovieContext, MovieContextProvider, useMovieContext }