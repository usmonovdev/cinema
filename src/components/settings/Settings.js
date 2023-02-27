import React, { useEffect } from 'react'
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ImageSize from './ImageSize'
import SliderSpeed from './SliderSpeed'
import ThemeColor from './ThemeColor'
import Avatar from './Avatar'
import "./settings.scss"
import { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'

function Settings() {
    const [tab, setTab] = useState(true)

    useEffect(() => {
        document.title = "Cinema App - Settings"
    })

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='settings-container'>
                    <div className="tab-box">
                        <button 
                            className={`tab ${tab ? "active" : ""}`} 
                            onClick={() => setTab(true)}
                        >
                            <HiPencil />Appearance
                        </button>
                        <button 
                            className={`tab ${!tab ? "active" : ""}`} 
                            onClick={() => setTab(false)}
                        >
                            <MdAccountCircle />Account
                        </button>
                    </div>
                </div>
                {!tab ?
                    <div className="settings-container">
                        <div className="set-title">
                            <h1>
                                <span>#</span>
                                Account settings
                            </h1>
                        </div>
                        <ul className='settings'>
                            <li>
                                <Avatar />
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="settings-container">
                        <div className="set-title">
                            <h1>
                                <span>#</span>
                                Appearance settings
                            </h1>
                        </div>
                        <p className='info'>You can set the settings for yourself in this <br /> section you can make it comfortable.</p>
                        <ul className='settings'>
                            <li>
                                <ImageSize />
                            </li>
                            <li>
                                <SliderSpeed />
                            </li>
                            <li>
                                <ThemeColor />
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Settings