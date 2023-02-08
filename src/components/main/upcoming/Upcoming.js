import React, { useState, useEffect } from 'react'
import { Popover } from 'antd';
import axios from 'axios';
import { GiSettingsKnobs } from 'react-icons/gi';
import { PopoverTitleUpcoming } from '../../../assets/AntD';
import { useStateContext } from '../../../context/StateContext/StateContext';
import Filter from './Filter';
import UpcomingData from './UpcomingData';
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
const API = "https://api.themoviedb.org/3/movie/upcoming?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Upcoming() {
    const { upState } = useMovieContext()
    const [upcoming, setUpcoming] = useState([]);
    console.log(upState.upFilter)
    const filter = upcoming?.filter((data) => {
        if (upState.upFilter == "en") { // filter by language
            return data.original_language == "en"
        } else if (upState.upFilter == "ru") {
            return data.original_language == "ru"
        } else if (upState.upFilter == "uz") {
            return data.original_language == "uz"
        } else if (upState.upFilter >= 9) { // filter by star
            return data.vote_average >= 9
        } else if (upState.upFilter >= 8) {
            return data.vote_average >= 8
        } else if (upState.upFilter >= 7) {
            return data.vote_average >= 7
        } else if (upState.upFilter >= 6) {
            return data.vote_average >= 6
        } else {
            return data
        }
    });

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
            <UpcomingData filter={filter} />
        </div>
    )
}

export default Upcoming