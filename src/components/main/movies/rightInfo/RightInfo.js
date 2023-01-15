import React from 'react'

function RightInfo({ movie }) {
    const genresNameLenght = [0, 1, 2]
    return (
        <>
            <h1>{movie.original_title} ({movie.release_date})</h1>
            <div>
                <p>{movie.release_date} ({movie.production_countries[0].iso_3166_1})</p>
                <p>{movie.genres[0].name}</p>
                <p>{movie.genres[1].name}</p>
                <p>{movie.genres[3].name}</p>
                <p>{movie.runtime}</p>
                <p>{movie.tagline}</p>
            </div>
        </>
    )
}

export default RightInfo