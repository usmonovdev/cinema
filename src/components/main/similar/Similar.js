import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import Filter from './Filter'
import axios from 'axios'
import "./trending.scss"
import SimilarData from './SimilarData'
import { PopoverTitleTrending } from "../../../assets/AntD"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Similar({ moviesId }) {
    const { filterValueInLang, filterValueInStar } = useMovieContext()
    const [movie, setMovie] = useState([]);

    const filter = movie?.filter((data) => {
        if (filterValueInLang == "en") { // filter by language
            return data.original_language == "en"
        } else if (filterValueInLang == "ru") {
            return data.original_language == "ru"
        } else if (filterValueInLang == "uz") {
            return data.original_language == "uz"
        } else if (filterValueInStar >= 9) { // filter by star
            return data.vote_average >= 9
        } else if (filterValueInStar >= 8) {
            return data.vote_average >= 8
        } else if (filterValueInStar >= 7) {
            return data.vote_average >= 7
        } else if (filterValueInStar >= 6) {
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
    }, []);
    return (
        <>
            {movie?.length !== 0 ? <>
                <div className='container' style={{ marginBottom: "60px" }}>
                    <div className="title-settings-box">
                        <h1 className='title-similar'><span className='sharp'>#</span> Similar Movies</h1>
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
            </> : ""}
        </>
    )
}

export default Similar