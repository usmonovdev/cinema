import { Select, ConfigProvider } from 'antd'
import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./filter.scss"

function Filter() {
    const { movie } = useMovieContext()
    // console.log(movie)
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const uniqueLang = [];

    const uniqueEmployees = movie.results.filter(element => {
        const isDuplicate = uniqueLang.includes(element.original_language);

        if (!isDuplicate) {
            uniqueLang.push(element.original_language);

            return true;
        }

        return false;
    });

    // Refresh Page to reset filter settings
    const refreshPage = () => {
        window.location.reload(false)
    }

    // console.log(uniqueEmployees)

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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    >
                        {uniqueEmployees.map((data) => {
                            return (
                                <>
                                    <Select.Option
                                        key={data.id}
                                        value={data.original_language}
                                    >
                                        <p className='option' style={{ textTransform: "capitalize" }}>{data.original_language}</p>
                                    </Select.Option>
                                </>
                            )
                        })}
                    </Select>
                </div>
                <div className='media-type'>
                    <p>Stars</p>
                    <Select
                        defaultValue="All"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'all',
                                label: 'All',
                            },
                            {
                                value: '8',
                                label: '8.0 +',
                            },
                            {
                                value: '9',
                                label: '9.0 +',
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