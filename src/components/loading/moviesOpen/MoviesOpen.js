import React, { useEffect } from 'react'
import "./moviesOpen.scss"

function MoviesOpen() {
    useEffect(() => {
        document.title = `Movie - Loading...`
    });
    return (
        <>
            <div className='movie-open-big'>
                <div className="left"></div>
                <div className="right">
                    <div className="title"></div>
                    <div className='tag-box'>
                        <div className="movie-tag"></div>
                        <div className="movie-tag"></div>
                        <div className="movie-tag"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviesOpen