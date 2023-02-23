import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import Filter from './Filter'
import { PopoverTitleTrending } from "../../../assets/AntD"
import axios from 'axios'
import TrendingData from './TrendingData'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./trending.scss"
import Homemovie from '../../loading/homeMovie/Homemovie'
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Trending() {
    const { trendingState } = useMovieContext();
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true)
    const filter = movie?.filter((data) => {
        if (trendingState.trendingFilter == "movie") { // FILTER BY MEDIA TYPE
            return data.media_type == "movie"
        } else if (trendingState.trendingFilter == "tv") {
            return data.media_type == "tv"
        } else if (trendingState.trendingFilter == "en") { // FILTER BY LANGUAGE
            return data.original_language == "en"
        } else if (trendingState.trendingFilter == "ru") {
            return data.original_language == "ru"
        } else if (trendingState.trendingFilter == "uz") {
            return data.original_language == "uz"
        } else if (trendingState.trendingFilter >= 9) { // FILTER BY STAR COUNT
            return data.vote_average >= 9
        } else if (trendingState.trendingFilter >= 8) {
            return data.vote_average >= 8
        } else if (trendingState.trendingFilter >= 7) {
            return data.vote_average >= 7
        } else if (trendingState.trendingFilter >= 6) {
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
                <Homemovie/>
            </> : <>
                <div className='container' style={{ marginBottom: "90px" }}>
                    <div className="title-settings-box">
                        <h1 className='title'><span className='sharp'>#</span> Trending</h1>
                        <Popover
                            placement="topRight"
                            content={<Filter />}
                            title={PopoverTitleTrending} trigger="click"
                        >
                            <GiSettingsKnobs />
                        </Popover>
                    </div>
                    <TrendingData filter={filter} />
                </div>
            </>}
        </>
    )
}

export default Trending