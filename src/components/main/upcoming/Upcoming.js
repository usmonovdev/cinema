import { Popover } from 'antd';
import axios from 'axios';
import { filter, slice } from 'lodash';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import UpcomingData from './UpcomingData';
const API = "https://api.themoviedb.org/3/movie/upcoming?api_key="
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Upcoming() {
    const { upcomingIndex } = useMovieContext()
    const [upcoming, setUpcoming] = useState([]);
    const loadedUpcoming = slice(upcoming, 0, upcomingIndex)
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
        <div className='container' style={{marginBottom: "60px"}}>
            <div className="title-settings-box">
                <h1 className='title'><span className='sharp'>#</span> Upcoming</h1>
                <GiSettingsKnobs />
            </div>
            <UpcomingData loadedUpcoming={loadedUpcoming}/>
        </div>
    )
}

export default Upcoming