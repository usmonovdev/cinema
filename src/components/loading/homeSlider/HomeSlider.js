import React from 'react'
import "./homeSlider.scss"

function HomeSlider() {
    return (
        <div className='load-slider'>
            <div className="box">
                <div className='arrows'>
                    <div className='back-and-next'>
                        <div className='icon'></div>
                        <div className='icon'></div>
                    </div>
                    <div className='play-icon'>
                        <div className='play'></div>
                        <div className='icon'></div>
                    </div>
                </div>
                <div className='info-box'>
                    <div className='big-text'></div>
                    <div className='small-text'></div>
                    <div className='small-text'></div>
                </div>
            </div>
        </div>
    )
}

export default HomeSlider