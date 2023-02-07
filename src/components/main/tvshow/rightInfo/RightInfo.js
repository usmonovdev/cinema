import React from 'react'
import "./rightInfo.scss"
import { Button, ConfigProvider, Drawer, Space, Tooltip } from 'antd';
import { AiOutlineHeart, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import Info from '../Info';
import { RxShare1 } from 'react-icons/rx';
import { reducer } from '../../../../assets/reducer';
import { useReducer } from 'react';

function RightInfo({ show }) {
    const initialState = {
        info: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const { original_title, first_air_date, status, overview, production_countries, episode_run_time, name } = show;
    const countries = production_countries || []
    const first = countries[0]?.iso_3166_1

    const allInfo = () => {
        dispatch({ type: "OPEN_TRUE" })
    }

    const onClose = () => {
        dispatch({ type: "OPEN_FALSE" })
    };

    const sharedData = {
        title: `Share Movie - ${name}`,
        text: `Watch the movie "${name}" via the link below.`,
        url: window.location
    }

    const share = () => {
        navigator.share(sharedData)
    }
    return (
        <>
            <div className="right-info">
                <h1>{original_title ? original_title : name}</h1>
                <div className='right-info-small'>
                    {first_air_date ? <p>{first_air_date?.replaceAll("-", "/")} ({first})</p> : ""}
                    {status ? <p>{status}</p> : ""}
                    {episode_run_time ? <p>Run time: {episode_run_time}min</p> : ""}
                </div>
                <div className="right-overview-box">
                    <p>{overview?.slice(0, 220)}</p>
                </div>
                {state.info ? <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#e6b31e"
                        }
                    }}
                >
                    <Drawer
                        title={original_title ? original_title : name}
                        onClose={onClose}
                        width={800}
                        open={state.info}
                        placement={"bottom"}
                        extra={
                            <Space>
                                <Button type="primary" onClick={onClose}>
                                    OK
                                </Button>
                            </Space>
                        }
                    >
                        <Info show={show} />
                    </Drawer>
                </ConfigProvider> : ""}
                <div className="events-box">
                    <Tooltip placement="bottom" title={"Mark As Fovorite"} color={"#343434"}>
                        <AiOutlineHeart className='events' />
                    </Tooltip>
                    <Tooltip placement="bottom" title={"Rate It!"} color={"#343434"}>
                        <AiOutlineStar className='events' />
                    </Tooltip>
                    <AiOutlineInfoCircle className='events allInfo' onClick={allInfo} />
                    <Tooltip placement="bottom" title={"Share Movie"} color={"#343434"}>
                        <RxShare1 className='events' onClick={share} />
                    </Tooltip>
                </div>
            </div>
        </>
    )
}

export default RightInfo