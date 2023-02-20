import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { reducer } from '../../assets/reducer'
import { RiMicLine, RiMovie2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { BiDollar } from "react-icons/bi"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Search() {
    const initialState = {
        apiData: [],
        inputValue: ""
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const handleInput = (e) => {
        dispatch({
            type: "INPUT_VALUE",
            newInputValue: e
        });
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${state.inputValue}`)
            .then((data) => {
                console.log(data)
                dispatch({
                    type: "SEARCH",
                    newApiData: data.data.results
                })
            })
    }, [state.inputValue]);

    return (
        <div className='search-result'>
            <div className='top'>
                <input
                    type="text"
                    className='input'
                    placeholder='Search...'
                    onChange={(e) => handleInput(e.target.value)}
                    value={state.inputValue}
                />
                <RiMicLine />
            </div>
            <div className='bottom'>
                {state.apiData?.length > 0 ?
                    <ul>
                        {state.apiData?.map((data) => {
                            const { id, name, title, popularity, vote_average, media_type } = data
                            const newName = name?.length > "20" ? `${name.slice(0, 25)}...` : name
                            const newTitle = title?.length > "20" ? `${title.slice(0, 25)}...` : title

                            const imya = newName ? newName : newTitle
                            return (
                                <li key={id}>
                                    <Link to={`${media_type == "movie" ? "movie" : "show"}/${id}`}>
                                        <h3>{imya}</h3>
                                    </Link>
                                    <div>
                                        <p><BiDollar /> {popularity}k</p>
                                        <p><AiFillStar /> {vote_average?.toString().slice(0, 3)}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    : <div className='not-found'>
                        <RiMovie2Line />
                        <p>No items!</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Search