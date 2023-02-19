import React from 'react'
import { BiMicrophone } from 'react-icons/bi'

function SearchTitle() {
    return (
        <ul className='user'>
            <li className='inp-and-sign'
            >
                <input
                    className='search-input'
                    type="text" placeholder='Search for Movies...'
                />
                <BiMicrophone className='search-voice' />
            </li>
        </ul>
    )
}

export default SearchTitle