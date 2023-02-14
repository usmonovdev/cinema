import React, { useReducer, useState } from 'react'
import Navbar from "../navbar/Navbar"
import user from "../../assets/user-not-downloaded.jpg"
import { MdRefresh } from 'react-icons/md'
import { Button, ConfigProvider, message, Radio, Switch } from 'antd'
import Footer from "../footer/Footer"
import "./settings.scss"
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function Settings() {
    const { imgState, colorState, imgDispatch } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()
    const key = "updatable"
    const defaultSize = () => {
        imgDispatch({
            type: "DEFAULT_IMAGE_SIZE"
        })
    }

    const info = (e) => {
        messageApi.open({
            key,
            type: "loading",
            content: "Loading..."
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: "success",
                content: `Image quality: ${e.target.value == "original" ? "High" : "Low"}`,
                duration: 2
            });
        }, 2000);
    }

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
                            <MdRefresh
                                style={{ color: colorState.color }}
                                onClick={defaultSize}
                            />
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
                                onChange={changeImageSize}
                                value={imgState.size}
                            >
                                <Radio
                                    onClick={info}
                                    className='radio'
                                    value={"original"}
                                >
                                    High
                                </Radio>
                                <Radio
                                    onClick={info}
                                    className='radio'
                                    value={"w500"}
                                >
                                    Low
                                </Radio>
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