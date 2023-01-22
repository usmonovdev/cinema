import { Select, Slider } from 'antd'
import { Option } from 'antd/es/mentions'
import React from 'react'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./filter.scss"

function Filter() {
    const { movie } = useMovieContext()
    console.log(movie)
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const uniqueIds = [];

    const uniqueEmployees = movie.results.filter(element => {
        const isDuplicate = uniqueIds.includes(element.original_language);

        if (!isDuplicate) {
            uniqueIds.push(element.original_language);

            return true;
        }

        return false;
    });

    console.log(uniqueEmployees)

    return (
        <div className='filter-container'>
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
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                >
                    {uniqueEmployees.map((data) => {
                        return (
                            <>
                                <Option
                                    key={data.id}
                                    value={data.original_language}>
                                    <p className='option'>{data.original_language}</p>
                                </Option>
                            </>
                        )
                    })}
                </Select>
            </div>
        </div>
    )
}

export default Filter