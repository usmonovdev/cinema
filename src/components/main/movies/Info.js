import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "../tvshow/info.scss"

function Info() {
    const { movie } = useMovieContext()
    const { budget, original_language, release_date, genres, production_companies, production_countries } = movie

    console.log(movie)
    return (
        <div className='info'>
            <div className='genres'>
                {genres?.map((data) => {
                    return (
                        <p key={data.id}>{data.name}</p>
                    )
                })}
            </div>
            <div className='border'>
                <p>Relase date: <span>{release_date?.replaceAll("-", "/")}</span></p>
                <p>Budget: <span>{budget}</span></p>
                <p className='lang'>Languages: <span>{original_language}</span></p>
            </div>
            <div className='border'>
                <p className='production_companies title'><span>Production companies: </span></p>
                {production_companies?.map((data) => {
                    return (
                        <p key={data.id}>{data.name}({data.origin_country})</p>
                    )
                })}
            </div>
            <div style={{marginTop: "5px"}}>
                <p className='title'><span>Production countries:</span></p>
                {production_countries?.map((data) => {
                    return (
                        <div key={data.id}>
                            <p>{data.name}({data.iso_3166_1})</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Info