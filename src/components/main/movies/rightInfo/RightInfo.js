import React from 'react'

function RightInfo({ movie }) {
    const { original_title, release_date, runtime, tagline, overview, production_countries } = movie;
    const convertProductionCountries = production_countries || []
    const first = convertProductionCountries[0]?.iso_3166_1
    return (
        <>
            <div className="right-info">
                <h1>{original_title} ({release_date?.slice(0, 4)})</h1>
                <div>
                    <p>{release_date?.replaceAll("-", "/")} ({first})</p>
                    <p>{tagline}</p>
                    <p>{overview}</p>
                </div>
            </div>
        </>
    )
}

export default RightInfo