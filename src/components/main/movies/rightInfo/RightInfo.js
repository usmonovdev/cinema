import React, { useReducer } from 'react'
import "./rightInfo.scss"
import { Button, ConfigProvider, Drawer, Space } from 'antd';
import { AiOutlineHeart, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import Info from '../Info';
import { RxShare1 } from 'react-icons/rx';
import { reducer } from '../../../../assets/reducer';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';

function RightInfo({ movie }) {
    const { colorState } = useMovieContext()
    const initialState = {
        info: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const { title, release_date, runtime, tagline, overview, production_countries, name } = movie;

    const countries = production_countries || []
    const first = countries[0]?.iso_3166_1

    // CHANGE MOVIE RUNCTIME MINUTE TO HOUR
    const hours = Math.floor(runtime / 60);
    const remainMinutes = runtime % 60;

    // OPEN THE MOVIE ALL INFO
    const allInfo = () => {
        dispatch({ type: "OPEN_TRUE" })
    };

    // CLOSE INFO PAGE
    const onClose = () => {
        dispatch({ type: "OPEN_FALSE" })
    };

    // SHARE DATA
    const sharedData = {
        title: `Share Movie - ${title}`,
        text: `${title}`,
        url: window.location
    }

    const share = () => {
        navigator.share(sharedData)
    }

    return (
        <>
            <div className="right-info">
                <h1>{title}</h1>
                <div className='right-info-small'>
                    <p>{release_date?.replaceAll("-", "/")} {first ? <span>({first})</span> : ""}</p>
                    {tagline ? <p>{tagline}</p> : ""}
                    {hours && remainMinutes !== NaN ? <p>{hours}h {remainMinutes}min</p> : ""}
                </div>
                <div className="right-overview-box">
                    <p>{overview?.slice(0, 220)}...</p>
                </div>
                {state.info ? <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: colorState.color
                        }
                    }}
                >
                    <Drawer
                        title={title ? title : name}
                        onClose={onClose}
                        width={800}
                        open={state.info}
                        placement={"bottom"}
                        style={
                            {
                                width:"100vw"
                            }
                        }
                        extra={
                            <Space>
                                <Button type="primary" onClick={onClose}>
                                    OK
                                </Button>
                            </Space>
                        }
                    >
                        <Info movie={movie} />
                    </Drawer>
                </ConfigProvider> : ""}
                <div className="events-box">
                    <AiOutlineHeart className='events' />
                    <AiOutlineStar className='events' />
                    <AiOutlineInfoCircle className='events allInfo' onClick={allInfo} />
                    <RxShare1 className='events' onClick={share} />
                </div>
            </div>
        </>
    )
}

export default RightInfo