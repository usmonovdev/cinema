import React, { useState, useEffect } from 'react'
import { Popover } from 'antd';
import { GiSettingsKnobs } from 'react-icons/gi';
import { PopoverTitleUpcoming } from '../../../assets/AntD';
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import { LoadHome } from '../../index';
import axios from 'axios';
import Filter from './Filter';
import UpcomingData from './UpcomingData';
const API = "https://api.themoviedb.org/3/movie/upcoming?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Upcoming() {
    const { upState } = useMovieContext()
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true)

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
                .then((data) => {
                    setUpcoming(data.data.results)
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
                                <h1><span>#</span>Upcoming</h1>
                                <p>Upcoming movies</p>
                            </div>
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
                </div>
            </>}
        </>
    )
}

export default Upcoming