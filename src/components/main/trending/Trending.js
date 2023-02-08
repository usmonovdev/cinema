import React, { useEffect, useState } from 'react'
import { Popover } from 'antd'
import { GiSettingsKnobs } from "react-icons/gi"
import Filter from './Filter'
import { PopoverTitleTrending } from "../../../assets/AntD"
import axios from 'axios'
import TrendingData from './TrendingData'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./trending.scss"
import { initial } from '../../../assets/reducer'
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Trending() {
    const { filterValueInMediaType, filterValueInLang, filterValueInStar } = useMovieContext()
    const [movie, setMovie] = useState([]);
    // console.log(initial.media)
    const filter = movie?.filter((data) => {
        if (initial.media == "movie") { //filter by media_type
            return data.media_type == "movie"
        } else if (filterValueInMediaType == "tv") {
            return data.media_type == "tv"
        } else if (filterValueInLang == "en") { // filter by language
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
    console.log(filter)

    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}`)
                .then((movie) => {
                    setMovie(movie.data.results)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);

    return (
        <div className='container' style={{marginBottom: "60px"}}>
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
    )
}

export default Trending