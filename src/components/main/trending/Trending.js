import { Popover } from 'antd'
import { slice } from 'lodash'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { GiSettingsKnobs } from "react-icons/gi"
import "./trending.scss"
import Filter from './Filter'
import { PopoverTitleTrending } from "../../../assets/AntD"
import axios from 'axios'
import TrendingData from './TrendingData'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
const API = "https://api.themoviedb.org/3/trending/all/day?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Trending() {
    const { filterValueInMediaType, filterValueInLang, filterValueInStar } = useMovieContext()
    const [movie, setMovie] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(4)
    const [loading, setLoading] = useState(false)

    // filter movie by media_type
    const filter = movie.filter((data) => {
        if (filterValueInMediaType == "movie") { //filter by media_type
            return data.media_type == "movie"
        } else if (filterValueInMediaType == "tv") {
            return data.media_type == "tv"
        } else if (filterValueInLang == "en") { // filter by language
            return data.original_language == "en"
        } else if (filterValueInLang == "fr") {
            return data.original_language == "fr"
        } else if (filterValueInLang == "tr") {
            return data.original_language == "tr"
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
    console.log(movie.length)
    console.log(index)
    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setIndex(index + 4)
            setLoading(false)
        }, 1000);
        if (index >= 16) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }

    return (
        <div className='container'>
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
            <TrendingData initialPosts={initialPosts} />
            {isCompleted ? "" :
                <>
                    <button className='load-more' onClick={loadMore}>
                        {loading ? <div className='spin'></div> : <><p>Load More</p><MdOutlineKeyboardArrowDown className='load-icon' /></>}
                    </button>
                </>
            }
        </div>
    )
}

export default Trending