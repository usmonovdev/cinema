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
import Name from './Name'
import Email from './Email'
import SignOut from './SignOut'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import DeleteUser from './DeleteUser'
import { message } from 'antd'

function Settings() {
    const [tab, setTab] = useState(true)
    const { currentUser } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage()
    console.log(currentUser)
    useEffect(() => {
        document.title = "Cinema App - Settings"
    }, [])

    const copy = (e) => {
        navigator.clipboard.writeText(e)
        messageApi.open({
            type: 'success',
            content: 'Copied to clipboard!',
            duration: 3
        });
    }

    return (
        <>
            {contextHolder}
            <Navbar />
            <div className='container'>
                {currentUser == null ? "" :
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
                }
                {!tab ?
                    <div className="settings-container">
                        <div className="set-title">
                            <h1>
                                <span>#</span>
                                User settings
                            </h1>
                        </div>
                        <p className='info'>You can change your information <br /> from this section.</p>
                        <p className='info'>Your id: <span onClick={e => copy(e.target.innerText)}>{currentUser.uid}</span></p>
                        <hr style={{ opacity: "0.2", marginBottom: "20px" }} />
                        <ul className='settings'>
                            <li>
                                <Avatar />
                            </li>
                            <li>
                                <Name />
                            </li>
                            <li>
                                <Email />
                            </li>
                            <li>
                                <SignOut />
                            </li>
                            <li>
                                <DeleteUser />
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
                        <hr style={{ opacity: "0.2", marginBottom: "20px" }} />
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