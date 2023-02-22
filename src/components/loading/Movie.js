import { Skeleton } from 'antd'
import React from 'react'
import "./movie.scss"

function Movie() {
    return (
        <>
            <div className='load-box-movie'>
                <div className="right">
                    <div className='image'></div>
                </div>
                <div className="left">
                    <div className='big-text'></div>
                    <div className='small-text'></div>
                    <div className='small-text'></div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            {/* <Skeleton active /> */}
        </>
    )
}

export default Movie