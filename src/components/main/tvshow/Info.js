import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./info.scss"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Info({ show }) {
    const [tv, setTv] = useState([])
    const { languages, genres, production_companies, first_air_date, last_air_date, seasons, production_countries, number_of_episodes } = show

    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=${API_KEY}`)
                .then((data) => {
                    setTv(data.data.cast)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, []);

    return (
        <div className='info'>
            <div className='genres'>
                {genres?.map((data, key) => {
                    return (
                        <p key={key}>{data.name}</p>
                    )
                })}
            </div>
            <div className='border'>
                <p>Air Date: <span>{first_air_date?.replaceAll("-", "/")}</span></p>
                <p>Last Air Date: <span>{last_air_date?.replaceAll("-", "/")}</span></p>
                <p className='lang'>Languages: <span>{languages}</span></p>
                <p>Number of episoder: <span>{number_of_episodes}</span></p>
            </div>
            <div className="border">
                <p className='title'><span>Seasons: </span></p>
                {seasons?.map((data, key) => {
                    return (
                        <div key={key}>
                            <p>Air date: <span>{data.air_date}</span></p>
                            <p>Name: <span>{data.name}</span></p>
                            <p>Episode count: <span>{data.episode_count}</span></p>
                        </div>
                    )
                })}
            </div>
            <div className='border'>
                <p className='production_companies title'><span>Production companies: </span></p>
                {production_companies?.map((data, key) => {
                    return (
                        <p key={key}>{data.name} {data.origin_country ? <>({data.origin_country})</> : ""}</p>
                    )
                })}
            </div>
            <div className='border'>
                <p className='title'><span>Production countries:</span></p>
                {production_countries?.map((data, key) => {
                    return (
                        <p key={key}>{data.name} ({data.iso_3166_1})</p>
                    )
                })}
            </div>
            <div style={{ marginTop: "5px" }}>
                <p className='title'><span>Actors:</span></p>
                {tv?.map((data, key) => {
                    return (
                        <p key={key}>
                            <span>{data?.name} </span>
                            {data?.character ? <>({data?.character})</> : ""}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Info