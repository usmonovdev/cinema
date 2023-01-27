import { Select, ConfigProvider } from 'antd'
import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex';
import "./filter.scss"

function Filter() {
    const { setFilterValueInMediaType, setFilterValueInLang, setFilterValueInStar } = useMovieContext()

    // filter by media
    const hendleFilterByMedia = (value) => {
        setFilterValueInMediaType(value)
    };

    // filter by language
    const handleFilterByLang = (value) => {
        setFilterValueInLang(value)
    };

    // filter by star
    const handleFilterByStar = (value) => {
        setFilterValueInStar(value)
    };

    // Refresh Page to reset filter settings
    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <div className='filter-container'>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#e6b31e"
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