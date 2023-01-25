import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./info.scss"
const imgLink = "https://image.tmdb.org/t/p/original/"

function Info() {
    const { movie } = useMovieContext()
    const { created_by, languages, networks, genres, production_companies} = movie

    console.log(movie)
    return (
        <div className='info'>
            <p>{languages}</p>
            {genres?.map((data) => {
                return (
                    <div key={data.id}>
                        <p>{data.name}</p>
                    </div>
                )
            })}
            {production_companies?.map((data) => {
                return (
                    <div key={data.id}>
                        {/* <img width="100px" src={`${imgLink}${data.logo_path}`}/> */}
                        <p>{data.name}({data.origin_country})</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Info