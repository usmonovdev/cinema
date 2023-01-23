import { Select, ConfigProvider } from 'antd'
import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./filter.scss"

function Filter() {
    const { movie, setMovie, filterMedia, setFilterMedia } = useMovieContext()

    // filter by media
    const hendleFilterByMedia = (value) => {
        const filterByMedia = movie.results.filter((data) => {
            if (value == "movie") {
                return data.media_type == "movie"
            } else if (value == "tv") {
                return data.media_type == "tv"
            } else {
                return data
            }
        })
        setFilterMedia(filterByMedia)
    };

    console.log(filterMedia)

    // filter by language
    const handleFilterByLang = (value) => {
        const filterByLang = movie.results.filter((data) => {
            if (value == "en") {
                return data.original_language == "en"
            } else if (value == "fr") {
                return data.original_language == "fr"
            } else if (value == "tr") {
                return data.original_language == "tr"
            } else {
                return data
            }
        })
        setFilterMedia(filterByLang)
    };

    // filter by star
    const handleFilterByStar = (value) => {
        const filterByStar = movie.results.filter((data) => {
            if (value >= "9") {
                return data.vote_average >= "9"
            } else if (value >= "8") {
                return data.vote_average >= "8"
            } else if (value >= "7") {
                return data.vote_average >= "7"
            } else if (value >= "6") {
                return data.vote_average >= "6"
            } else {
                return data
            }
        })
        setFilterMedia(filterByStar)
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
                                label: 'Tv Show',
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
                                value: 'fr',
                                label: 'France',
                            },
                            {
                                value: 'tr',
                                label: 'Turkish',
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