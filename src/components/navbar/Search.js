import React,{ useEffect, useReducer } from 'react'
import axios from 'axios'
import { reducer } from '../../assets/reducer'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Search({searchData}) {
    const initialState = {
        apiData: []
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchData}&page=1&include_adult=false`)
        .then((data) => {
            console.log(data)
            dispatch({
                type: "SEARCH"
            })
        })
    }, [])
  return (
    <div className='search-result'>
        <p>{searchData}</p>
    </div>
  )
}

export default Search