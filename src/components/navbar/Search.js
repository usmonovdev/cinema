import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { reducer } from '../../assets/reducer'
import { RiMicLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Search() {
    const initialState = {
        apiData: [],
        inputValue: ""
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state.inputValue)
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
    }, []);

    return (
        <div className='search-result'>
            <div className='top'>
                <input
                    type="text"
                    className='input'
                    placeholder='Search...'
                    onChange={(e) => handleInput(e.target.value)}
                />
                <RiMicLine />
            </div>
            <div className='bottom'>
                {/* {state.apiData?.map((data) => {
                    return (
                        <p>{data.original_title}</p>
                    )
                })} */}
                <ul>
                    <li>
                        <Link to="#">
                            <h3>Spider Man</h3>
                        </Link>
                        <div>
                            <p>vote average: 9.1</p>
                            <p>Pul: 8</p>
                        </div>
                    </li>
                    <li>
                        <Link to="#">
                            <h3>Spider Man</h3>
                        </Link>
                        <div>
                            <p>vote average: 9.1</p>
                            <p>Pul: 8</p>
                        </div>
                    </li>
                    <li>
                        <Link to="#">
                            <h3>Spider Man</h3>
                        </Link>
                        <div>
                            <p>vote average: 9.1</p>
                            <p>Pul: 8</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Search