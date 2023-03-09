import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import { PopoverTitleTrending } from "../../../assets/AntD"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import Filter from './Filter'
import axios from 'axios'
import SimilarData from './SimilarData'
import "../trending/trending.scss"
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Similar({ moviesId }) {
    const { simState } = useMovieContext()
    const [movie, setMovie] = useState([]);

    const filter = movie?.filter((data) => {
        if (simState.simFilter == "en") { // FILTER BY LANGUAGE
            return data.original_language == "en"
        } else if (simState.simFilter == "ru") {
            return data.original_language == "ru"
        } else if (simState.simFilter == "uz") {
            return data.original_language == "uz"
        } else if (simState.simFilter >= 9) { // FILTER BY STAR
            return data.vote_average >= 9
        } else if (simState.simFilter >= 8) {
            return data.vote_average >= 8
        } else if (simState.simFilter >= 7) {
            return data.vote_average >= 7
        } else if (simState.simFilter >= 6) {
            return data.vote_average >= 6
        } else {
            return data
        }
    });

    useEffect(() => {
        try {
            axios.get(`${API}${moviesId}/similar?api_key=${API_KEY}`)
                .then((movie) => {
                    setMovie(movie.data.results)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [moviesId]);
    return (
        <>
            {movie?.length !== 0 ? <>
                <div className='container'>
                    <div className="movies-box">
                        <div className="title-settings-box">
                            <div className="title-info">
                                <h1><span>#</span>Similar</h1>
                                <p>Similar to the movie above</p>
                            </div>
                            <Popover
                                placement="topRight"
                                content={<Filter />}
                                title={PopoverTitleTrending}
                                trigger="click"
                            >
                                <GiSettingsKnobs />
                            </Popover>
                        </div>
                        <SimilarData filter={filter} />
                    </div>

                </div>
            </> : ""}
        </>
    )
}

export default Similar