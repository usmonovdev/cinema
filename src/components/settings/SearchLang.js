import React from 'react'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function SearchLang() {
    const { colorState } = useMovieContext()

    const defaultLang = () => {

    }

    return (
        <>
            <div className='setting-title'>
                <h3>Voice Search Language</h3>
                <MdRefresh
                    style={{ color: colorState.color }}
                    onClick={defaultLang}
                />
            </div>
        </>
    )
}

export default SearchLang