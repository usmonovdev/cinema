import React from 'react'
import { Select, ConfigProvider } from 'antd'
import "../trending/filter.scss"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';

function Filter() {
    const { upDispatch } = useMovieContext()

    // filter by language
    const handleFilterUpcomingByLang = (value) => {
        upDispatch({
            type: "FILTER_UP",
            upFilter: value
        });
    };

    // filter by star
    const handleFilterUpcomingByStar = (value) => {
        upDispatch({
            type: "FILTER_UP",
            upFilter: value
        });
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
                    <p>Lang</p>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={event => handleFilterUpcomingByLang(event)}
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
                        onChange={event => handleFilterUpcomingByStar(event)}
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