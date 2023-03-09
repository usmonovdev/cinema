import React, { useEffect, useState, useContext } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { message } from 'antd'
import {
    Navbar, Footer, SetAvatar, SetDeleteUser, SetEmail,
    SetImageSize, SetSliderSpeed, SetTheme, SetName, SetOut
} from "../index";
import "./settings.scss"

function Settings() {
    const [tab, setTab] = useState(true)
    const { currentUser } = useContext(AuthContext)
    const [messageApi, contextHolder] = message.useMessage()

    const createdToDate = new Date(currentUser?.metadata?.creationTime).toString().slice(4, 21)

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
                        <p className='info' style={{ marginBottom: "0" }}>Account created in: <span>{createdToDate}</span></p>
                        <p className='info'>Your id: <span onClick={e => copy(e.target.innerText)}>{currentUser?.uid}</span></p>
                        <hr style={{ opacity: "0.2", marginBottom: "20px" }} />
                        <ul className='settings'>
                            <li>
                                <SetAvatar />
                            </li>
                            <li>
                                <SetName />
                            </li>
                            <li>
                                <SetEmail />
                            </li>
                            <li>
                                <SetOut />
                            </li>
                            <li>
                                <SetDeleteUser />
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
                                <SetImageSize />
                            </li>
                            <li>
                                <SetSliderSpeed />
                            </li>
                            <li>
                                <SetTheme />
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