import { Popover } from 'antd';
import axios from 'axios';
import { slice } from 'lodash';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { PopoverTitleUpcoming } from '../../../assets/AntD';
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { useStateContext } from '../../../context/StateContext/StateContext';
import Filter from './Filter';
import UpcomingData from './UpcomingData';
const API = "https://api.themoviedb.org/3/movie/upcoming?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Upcoming() {
    const { upcomingIndex } = useMovieContext()
    const { filterUpLang, filterUpStar } = useStateContext()
    const [upcoming, setUpcoming] = useState([]);

    const filter = upcoming.filter((data) => {
        if (filterUpLang == "en") { // filter by language
            return data.original_language == "en"
        } else if (filterUpLang == "fr") {
            return data.original_language == "fr"
        } else if (filterUpLang == "tr") {
            return data.original_language == "tr"
        } else if (filterUpStar >= 9) { // filter by star
            return data.vote_average >= 9
        } else if (filterUpStar >= 8) {
            return data.vote_average >= 8
        } else if (filterUpStar >= 7) {
            return data.vote_average >= 7
        } else if (filterUpStar >= 6) {
            return data.vote_average >= 6
        } else {
            return data
        }
    });

    const loadedUpcoming = slice(filter, 0, upcomingIndex)
    console.log(upcoming)
    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}`)
                .then((movie) => {
                    setUpcoming(movie.data.results)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);
    return (
        <div className='container' style={{ marginBottom: "60px" }}>
            <div className="title-settings-box">
                <h1 className='title'><span className='sharp'>#</span> Upcoming</h1>
                <Popover
                    placement="topRight"
                    content={<Filter />}
                    title={PopoverTitleUpcoming} trigger="click"
                >
                    <GiSettingsKnobs />
                </Popover>
            </div>
            <UpcomingData loadedUpcoming={loadedUpcoming} />
        </div>
    )
}

export default Upcoming