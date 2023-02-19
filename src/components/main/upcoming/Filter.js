import React from 'react'
import { Select, ConfigProvider } from 'antd'
import "../trending/filter.scss"
import { useMovieContext } from '../../../context/MovieContex/MovieContex';

function Filter() {
    const { upDispatch, colorState } = useMovieContext()

    // FILTER BY LANGUAGE
    const handleFilterUpcomingByLang = (value) => {
        upDispatch({
            type: "FILTER_UP",
            upFilter: value
        });
    };

    // FILTER BY STAR COUNT
    const handleFilterUpcomingByStar = (value) => {
        upDispatch({
            type: "FILTER_UP",
            upFilter: value
        });
    };

    // REFRESH PAGE FUNCTION FOR RESET FILTER FUNCTIONS
    const handleReset = () => {
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
            <button className='reset' onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Filter