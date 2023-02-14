import React, { useState } from 'react'
import Navbar from "../navbar/Navbar"
import user from "../../assets/user-not-downloaded.jpg"
import { MdRefresh } from 'react-icons/md'
import { ConfigProvider, message, Radio, Switch } from 'antd'
import Footer from "../footer/Footer"
import "./settings.scss"
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function Settings() {
    const [messageApi, contextHolder] = message.useMessage()
    const alert = () => {
        messageApi.info("Successful changed")
    }
    const { imgState, colorState, imgDispatch } = useMovieContext()
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const changeImageSize = (e) => {
        imgDispatch({ 
            type: "IMAGE_SIZE", 
            newSize: e.target.value
        })
    };
    return (
        <>
        {contextHolder}
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
                        <div className='setting-title'>
                            <h3>Quality images</h3>
                            <MdRefresh style={{ color: colorState.color }} />
                        </div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: colorState.color,
                                    borderRadius: "0",
                                    colorText: "#fff"
                                }
                            }}
                        >
                            <Radio.Group className='functions'
                                onClick={alert}
                                onChange={changeImageSize} 
                                value={imgState.size}
                            >
                                <Radio className='radio' value={"original"}>High</Radio>
                                <Radio className='radio' value={"w500"}>Low</Radio>
                            </Radio.Group>
                        </ConfigProvider>
                    </li>
                    <li>
                        <div className='setting-title'>
                            <h3>Slider speed</h3>
                            <MdRefresh style={{ color: colorState.color }} />
                        </div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: colorState.color,
                                    borderRadius: "0",
                                    colorText: "#fff"
                                }
                            }}
                        >
                            <Radio.Group className='functions'
                                onChange={onChange} value={value}
                            >
                                <Radio className='radio' value={1}>High</Radio>
                                <Radio className='radio' value={2}>Medium</Radio>
                                <Radio className='radio' value={3}>Low</Radio>
                            </Radio.Group>
                        </ConfigProvider>
                    </li>
                    <li>
                        <div className='setting-title'>
                            <h3>Theme Color</h3>
                            <MdRefresh style={{ color: colorState.color }} />
                        </div>
                        <Radio.Group className='functions'
                            onChange={onChange} value={value}
                        >
                            <Radio className='radio' value={1}>
                                <div className='color1'></div>
                            </Radio>
                            <Radio className='radio' value={2}>
                                <div className='color1'></div>
                            </Radio>
                            <Radio className='radio' value={3}>
                                <div className='color1'></div>
                            </Radio>
                        </Radio.Group>
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