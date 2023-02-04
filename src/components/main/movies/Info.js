import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "../tvshow/info.scss"
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Info() {
    const [actors, setActors] = useState([])
    const { movie } = useMovieContext()
    const { budget, original_language, release_date, genres, production_companies, production_countries } = movie;
    useEffect(() => {
        axios.get(`${API}${movie.id}/credits?api_key=${API_KEY}`)
            .then((data) => {
                setActors(data.data.cast)
            });
    }, []);
    console.log(actors)
    return (
        <div className='info'>
            <div className='genres'>
                {genres.slice(0, 3)?.map((data, key) => {
                    return (
                        <p key={key}>{data.name}</p>
                    )
                })}
            </div>
            <div className='border'>
                <p>Relase date: <span>{release_date?.replaceAll("-", "/")}</span></p>
                <p>Budget: <span>${budget}</span></p>
                <p className='lang'>Languages: <span>{original_language}</span></p>
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
                {actors?.map((data, key) => {
                    return (
                        <p key={key}><span>{data?.name}</span> ({data?.character})</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Info