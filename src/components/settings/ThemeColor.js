import React, { useEffect } from 'react'
import { message } from 'antd'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function ThemeColor() {
    const { colorState, colorDispatch } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()

    // THEME_COLOR FOR GLOBAL STYLES
    // GET THE ROOT PROPERTY AND SET THIS COLOR
    const root = document.querySelector(":root")

    const key = "updatable"
    const changeTheme = (e) => {
        setTimeout(() => {
            colorDispatch({
                type: "THEME",
                payload: e.target.value
            })
            root.style.setProperty("--yellow", e.target.value)
        }, 1800);
    }

    useEffect(() => {
        window.localStorage.setItem("THEME_COLOR", colorState.color)
    }, [colorState.color])

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
                content: "Theme changed",
                duration: 2
            });
        }, 2000);
    }

    const defaultColor = () => {
        colorDispatch({
            type: "DEFAULT_THEME"
        })
        messageApi.open({
            key,
            type: "loading",
            content: "Loading..."
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: "success",
                content: "Returned successfully!",
                duration: 2
            });
        }, 2000);
    }

    return (
        <>
            {contextHolder}
            <div className='setting-title'>
                <h3>Theme Color</h3>
                <MdRefresh
                    style={{ color: colorState.color }}
                    onClick={defaultColor}
                />
            </div>
            <div
                className='functions theme'
                onChange={e => changeTheme(e)}
            >
                <div className='radio-box'>
                    <input
                        defaultChecked
                        type="radio"
                        name='theme'
                        id='radio1'
                        value={"#e6b31e"}
                    />
                    <label
                        style={{ backgroundColor: "#e6b31e", borderRadius: "10px" }}
                        htmlFor="radio1"
                        onClick={info}
                    ></label>
                </div>
                <div className='radio-box'>
                    <input
                        type="radio"
                        name='theme'
                        id='radio2'
                        value={"#bb86fc"}
                    />
                    <label
                        style={{ backgroundColor: "#bb86fc", borderRadius: "10px" }}
                        htmlFor="radio2"
                        onClick={info}
                    ></label>
                </div>
                <div className='radio-box'>
                    <input
                        type="radio"
                        name='theme'
                        id='radio3'
                        value={"#03dac5"}
                    />
                    <label
                        style={{ backgroundColor: "#03dac5", borderRadius: "10px" }}
                        htmlFor="radio3"
                        onClick={info}
                    ></label>
                </div>
                <div className='radio-box'>
                    <input
                        type="radio"
                        name='theme'
                        id='radio4'
                        value={"#e300ac"}
                    />
                    <label
                        style={{ backgroundColor: "#e300ac", borderRadius: "10px" }}
                        htmlFor="radio4"
                        onClick={info}
                    ></label>
                </div>
            </div>
        </>
    )
}

export default ThemeColor