import React from 'react'
import { Select, ConfigProvider } from 'antd'
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import "./filter.scss"

function Filter() {
    const { trendingDispatch, colorState } = useMovieContext()

    // FILTER BY MEDIA TYPE
    const hendleFilterByMedia = (value) => {
        trendingDispatch({
            type: "FILTER_TRENDING",
            nextTrend: value
        });
    };

    // FILTER BY LANGUAGE
    const handleFilterByLang = (value) => {
        trendingDispatch({
            type: "FILTER_TRENDING",
            nextTrend: value
        });
    };

    // FILTER BY STAR
    const handleFilterByStar = (value) => {
        trendingDispatch({
            type: "FILTER_TRENDING",
            nextTrend: value
        });
    };

    // REFRESH PAGE FUNCTION FOR RESET FILTER SETTINGS
    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <div className='filter-container'>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: colorState.color
                    }
                }}
            >
                <div className='media-type'>
                    <p>Media</p>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={event => hendleFilterByMedia(event)}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: 'movie',
                                label: 'Movie',
                            },
                            {
                                value: 'tv',
                                label: 'Tv Films',
                            }
                        ]}
                    />
                </div>
                <div className='media-type'>
                    <p>Lang</p>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={event => handleFilterByLang(event)}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: 'en',
                                label: 'English',
                            },
                            {
                                value: 'ru',
                                label: 'Russian',
                            },
                            {
                                value: 'uz',
                                label: 'Uzbek',
                            }
                        ]}
                    />
                </div>
                <div className='media-type'>
                    <p>Stars</p>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={event => handleFilterByStar(event)}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: '9',
                                label: '9.0 +',
                            },
                            {
                                value: '8',
                                label: '8.0 +',
                            },
                            {
                                value: '7',
                                label: '7.0 +',
                            },
                            {
                                value: '6',
                                label: '6.0 +',
                            }
                        ]}
                    />
                </div>
            </ConfigProvider>
            <button className='reset' onClick={refreshPage}>Reset</button>
        </div>
    )
}

export default Filter