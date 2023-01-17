import React from 'react'
import "./rightInfo.scss"

function RightInfo({ movie }) {
    const { original_title, release_date, runtime, tagline, overview, production_countries } = movie;
    const convertProductionCountries = production_countries || []
    const first = convertProductionCountries[0]?.iso_3166_1

    const hours = Math.floor(runtime / 60);
    const remainMinutes = runtime % 60;
    return (
        <>
            <div className="right-info">
                <h1>{original_title} ({release_date?.slice(0, 4)})</h1>
                <div className='right-info-box'>
                    <p>{release_date?.replaceAll("-", "/")} ({first}) •</p>
                    <p>{tagline} •</p>
                    <p>{hours}h {remainMinutes}min</p>
                </div>
                <p>{overview}</p>
            </div>
        </>
    )
}

export default RightInfo