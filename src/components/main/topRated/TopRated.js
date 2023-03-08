import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import { PopoverTitleTop } from "../../../assets/AntD"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { LoadHome } from "../../index"
import axios from 'axios'
import Filter from './Filter'
import TopRatedData from './TopRatedData'
import "../trending/trending.scss"
const API = "https://api.themoviedb.org/3/movie/top_rated?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function TopRated() {
    const { topState } = useMovieContext()
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true)

    const filter = movie?.filter((data) => {
        if (topState.topFilter == "en") { // FILTER BY LANGUAGE
            return data.original_language == "en"
        } else if (topState.topFilter == "ru") {
            return data.original_language == "ru"
        } else if (topState.topFilter == "uz") {
            return data.original_language == "uz"
        } else if (topState.topFilter >= 9) { // FILTER BY STAR
            return data.vote_average >= 9
        } else if (topState.topFilter >= 8) {
            return data.vote_average >= 8
        } else if (topState.topFilter >= 7) {
            return data.vote_average >= 7
        } else if (topState.topFilter >= 6) {
            return data.vote_average >= 6
        } else {
            return data
        }
    });

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}`)
                .then((movie) => {
                    setMovie(movie.data.results)
                    setLoading(false)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);

    return (
        <>
            {loading ? <>
                <LoadHome />
            </> : <>
                <div className='container'>
                    <div className="movies-box">
                        <div className="title-settings-box">
                            <div className="title-info home">
                                <h1><span>#</span>Top rated</h1>
                                <p>Top rated movies</p>
                            </div>
                            <Popover
                                placement="topRight"
                                content={<Filter />}
                                title={PopoverTitleTop} trigger="click"
                            >
                                <GiSettingsKnobs />
                            </Popover>
                        </div>
                        <TopRatedData filter={filter} />
                    </div>

                </div>
            </>}
        </>
    )
}

export default TopRated