import React from 'react'
import Navbar from "../navbar/Navbar"
import user from "../../assets/user-not-downloaded.jpg"
import { MdRefresh } from 'react-icons/md'
import { Switch } from 'antd'
import Footer from "../footer/Footer"
import "./settings.scss"
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import ImageSize from './ImageSize'
import SliderSpeed from './SliderSpeed'
import ThemeColor from './ThemeColor'

function Settings() {
    const { colorState } = useMovieContext()

    const onChange = () => {
        console.log("for animations")
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="set-title">
                    <h1>
                        <span>#</span>
                        Settings
                    </h1>
                    <img width="30px" height="30px" src={user} alt="user photo" />
                </div>
                <p className='info'>You can set the settings for yourself in this <br /> section you can make it comfortable.</p>
                <ul className='settings'>
                    <li>
                        <ImageSize/>
                    </li>
                    <li>
                        <SliderSpeed />
                    </li>
                    <li>
                        <ThemeColor />
                    </li>
                    <li>
                        <div className='setting-title'>
                            <h3>Animations</h3>
                            <MdRefresh style={{ color: colorState.color }} />
                        </div>
                        <div className='functions'>
                            <span>Off</span>
                            <Switch defaultChecked onChange={onChange} />
                            <span>On</span>
                        </div>
                    </li>
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default Settings