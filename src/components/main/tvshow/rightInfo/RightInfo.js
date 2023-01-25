import React from 'react'
import "./rightInfo.scss"
import { RxBookmark } from "react-icons/rx"
import { Button, Drawer, Space, Tooltip } from 'antd';
import { AiOutlineHeart, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import Info from '../Info';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';
import { useState } from 'react';

function RightInfo() {
    const { info, setInfo, movie } = useMovieContext()
    const { original_title, first_air_date, status, overview, production_countries, episode_run_time } = movie;
    const convertProductionCountries = production_countries || []
    const first = convertProductionCountries[0]?.iso_3166_1
    const allInfo = () => {
        setInfo(true);
    }

    const onClose = () => {
        setInfo(false);
    };
    return (
        <>
            <div className="right-info">
                <h1>{original_title}</h1>
                <div className='right-info-small'>
                    {first_air_date ? <p>{first_air_date?.replaceAll("-", "/")} ({first})</p> : ""}
                    {status ? <p>{status}</p> : ""}
                    {episode_run_time ? <p>Run time: {episode_run_time}min</p> : ""}
                </div>
                <div className="right-overview-box">
                    <p>{overview}</p>
                </div>
                {info ? <Drawer
                    title="Title"
                    onClose={onClose}
                    width={500}
                    open={info}
                    placement={"bottom"}
                    extra={
                        <Space>
                            <Button type="primary" onClick={onClose}>
                                OK
                            </Button>
                        </Space>
                    }
                >
                    <Info />
                </Drawer> : ""}
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
                    <Tooltip placement="bottom" title={"All info"} color={"#343434"}>
                        <AiOutlineInfoCircle className='events allInfo' onClick={allInfo} />
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default RightInfo