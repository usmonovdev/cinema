import { message } from 'antd'
import React from 'react'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function ThemeColor() {
    const { colorState, colorDispatch } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()
    const key = "updatable"

    const changeTheme = (e) => {
        setTimeout(() => {
            colorDispatch({
                type: "THEME",
                newColor: e.target.value
            })
            localStorage.setItem("theme", e.target.value)
        }, 1800);
    }

    console.log(colorState.color)

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
                        style={{ backgroundColor: "#e6b31e" }}
                        htmlFor="radio1"
                        onClick={info}
                    ></label>
                </div>
                <div className='radio-box'>
                    <input
                        type="radio"
                        name='theme'
                        id='radio2'
                        value={"#BB86FC"}
                    />
                    <label
                        style={{ backgroundColor: "#BB86FC" }}
                        htmlFor="radio2"
                        onClick={info}
                    ></label>
                </div>
                <div className='radio-box'>
                    <input
                        type="radio"
                        name='theme'
                        id='radio3'
                        value={"#03DAC5"}
                    />
                    <label
                        style={{ backgroundColor: "#03DAC5" }}
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
                        style={{ backgroundColor: "#e300ac" }}
                        htmlFor="radio4"
                        onClick={info}
                    ></label>
                </div>
            </div>
        </>
    )
}

export default ThemeColor