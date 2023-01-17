import React from 'react'
import "./rightInfo.scss"
import { RxBookmark } from "react-icons/rx"
import { Tooltip } from 'antd';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';

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
                <div className='right-info-small'>
                    <p>{release_date?.replaceAll("-", "/")} ({first}) •</p>
                    <p>{tagline} •</p>
                    <p>{hours}h {remainMinutes}min</p>
                </div>
                <div className="right-overview-box">
                    <p>{overview}</p>
                </div>
                <div className="events-box">
                    <Tooltip placement="bottom" title={"Mark As Fovorite"} color={"#343434"}>
                        <AiOutlineHeart className='events' />
                    </Tooltip>
                    <Tooltip placement="bottom" title={"Rate It!"} color={"#343434"}>
                        <AiOutlineStar className='events' />
                    </Tooltip>
                    <Tooltip placement="bottom" title={"Add To Your Watchlist"} color={"#343434"}>
                        <RxBookmark className='events' />
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default RightInfo