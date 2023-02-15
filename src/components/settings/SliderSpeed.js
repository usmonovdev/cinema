import { ConfigProvider, message, Radio } from 'antd'
import React from 'react'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function SliderSpeed() {
    // const colorS = localStorage.getItem("theme")
    const { speedDispatch, colorState, speedState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()
    // console.log(color)
    const key = "updatable"

    const changeSpeed = (e) => {
        speedDispatch({
            type: "SPEED",
            newSpeed: e.target.value
        })
    }

    const defaultSize = () => {
        speedDispatch({
            type: "DEFAULT_SLIDER_SPEED"
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
                content: `Slider speed: ${e.target.value == "3000" ? "High" : e.target.value == "6000" ? "Medium" : "Low"}`,
                duration: 2
            });
        }, 2000);
    }
    return (
        <>
            {contextHolder}
            <div className='setting-title'>
                <h3>Slider speed</h3>
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
                    onChange={changeSpeed} value={speedState.speed}
                >
                    <Radio
                        onClick={info}
                        className='radio'
                        value={"3000"}
                    >
                        High
                    </Radio>
                    <Radio
                        className='radio'
                        value={"6000"}
                        onClick={info}
                    >
                        Medium
                    </Radio>
                    <Radio
                        className='radio'
                        value={"10000"}
                        onClick={info}
                    >
                        Low
                    </Radio>
                </Radio.Group>
            </ConfigProvider>
        </>
    )
}

export default SliderSpeed