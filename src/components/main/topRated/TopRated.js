import { Popover } from 'antd'
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { GiSettingsKnobs } from "react-icons/gi"
import "../trending/trending.scss"
import Filter from './Filter'
import { PopoverTitleTop } from "../../../assets/AntD"
import axios from 'axios'
import TopRatedData from './TopRatedData'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { useStateContext } from '../../../context/StateContext/StateContext'
const API = "https://api.themoviedb.org/3/movie/top_rated?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function TopRated() {
    const { index } = useMovieContext()
    const { filterTopMedia, filterTopLang, filterTopStar } = useStateContext()
    const [movie, setMovie] = useState([]);

    const filter = movie.filter((data) => {
        if (filterTopLang == "en") { // filter by language
            return data.original_language == "en"
        } else if (filterTopLang == "ru") {
            return data.original_language == "ru"
        } else if (filterTopLang == "uz") {
            return data.original_language == "uz"
        } else if (filterTopStar >= 9) { // filter by star
            return data.vote_average >= 9
        } else if (filterTopStar >= 8) {
            return data.vote_average >= 8
        } else if (filterTopStar >= 7) {
            return data.vote_average >= 7
        } else if (filterTopStar >= 6) {
            return data.vote_average >= 6
        } else {
            return data
        }
    });

    const initialPosts = slice(filter, 0, index)
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

    console.log(movie)

    return (
        <div className='container' style={{marginBottom: "60px"}}>
            <div className="title-settings-box">
                <h1 className='title'><span className='sharp'>#</span> Top Rated</h1>
                <Popover
                    placement="topRight"
                    content={<Filter />}
                    title={PopoverTitleTop} trigger="click"
                >
                    <GiSettingsKnobs />
                </Popover>
            </div>
            <TopRatedData initialPosts={initialPosts} />
        </div>
    )
}

export default TopRated