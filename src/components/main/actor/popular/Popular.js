import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PopularData from './PopularData';
import "./popular.scss"
import "../../trending/trending.scss"

function Popular() {
    const API = "https://api.themoviedb.org/3/person/popular?api_key="
    const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
    const [popular, setPopular] = useState([])

    // GET THE API DATA AND SET THE STATE
    useEffect(() => {
        try {
            axios.get(`${API}${API_KEY}`)
                .then((data) => {
                    setPopular(data.data.results)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);

    return (
        <div className='container'>
            <div className="movies-box">
                <div className="title-settings-box">
                    <div className="title-info">
                        <h1><span>#</span>Actors</h1>
                        <p>Popular actors</p>
                    </div>
                </div>
                <PopularData popular={popular} />
            </div>
        </div>
    )
}

export default Popular