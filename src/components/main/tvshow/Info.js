import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./info.scss"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Info({ show }) {
    const [actor, setActor] = useState([])
    const { languages, genres, production_companies, first_air_date, last_air_date, seasons, production_countries, number_of_episodes } = show

    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=${API_KEY}`)
                .then((data) => {
                    setActor(data.data.cast)
                });
        } catch (error) {
            console.log("Error in API", error)
        }
    }, [show.id]);

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
            {seasons.length !== 0 ?
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
                </div> : ""
            }
            {production_companies.length !== 0 ?
                <div className='border'>
                    <p className='production_companies title'><span>Production companies: </span></p>
                    {production_companies?.map((data, key) => {
                        return (
                            <p key={key}>{data.name} {data.origin_country ? <>({data.origin_country})</> : ""}</p>
                        )
                    })}
                </div> : ""
            }
            {production_countries.length !== 0 ?
                <div className='border'>
                    <p className='title'><span>Production countries:</span></p>
                    {production_countries?.map((data, key) => {
                        return (
                            <p key={key}>{data.name} ({data.iso_3166_1})</p>
                        )
                    })}
                </div> : ""
            }
            {actor.length !== 0 ?
                <div style={{ marginTop: "5px" }}>
                    <p className='title'><span>Actors:</span></p>
                    {actor?.map((data, key) => {
                        return (
                            <p key={key}>
                                <span>{data?.name} </span>
                                {data?.character ? <>({data?.character})</> : ""}
                            </p>
                        )
                    })}
                </div> : ""
            }
        </div>
    )
}

export default Info