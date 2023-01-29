import React from 'react'
import "./rightInfo.scss"
import { Button, ConfigProvider, Drawer, Space, Tooltip } from 'antd';
import { AiOutlineHeart, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import Info from '../Info';
import { useMovieContext } from '../../../../context/MovieContex/MovieContex';

function RightInfo() {
    const { info, setInfo, movie } = useMovieContext()
    const { title, release_date, runtime, tagline, overview, production_countries, name } = movie;
    const convertProductionCountries = production_countries || []
    const first = convertProductionCountries[0]?.iso_3166_1

    const hours = Math.floor(runtime / 60);
    const remainMinutes = runtime % 60;
    const allInfo = () => {
        setInfo(true);
    };

    const onClose = () => {
        setInfo(false);
    };
    return (
        <>
            <div className="right-info">
                <h1>{title}</h1>
                <div className='right-info-small'>
                    <p>{release_date?.replaceAll("-", "/")} ({first})</p>
                    {tagline ? <p>{tagline}</p> : ""}
                    <p>{hours}h {remainMinutes}min</p>
                </div>
                <div className="right-overview-box">
                    <p>{overview}</p>
                </div>
                {info ? <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#e6b31e"
                        }
                    }}
                >
                    <Drawer
                        title={title ? title : name}
                        onClose={onClose}
                        width={800}
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
                </div>
            </div>
        </>
    )
}

export default RightInfo