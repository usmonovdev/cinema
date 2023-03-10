import { ConfigProvider, message, Radio } from 'antd'
import React, { useEffect } from 'react'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function SliderSpeed() {
    const { speedDispatch, colorState, speedState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()
    const key = "updatable"

    // CHANGE SLIDER SPEED FUNCTION
    const changeSpeed = (e) => {
        setTimeout(() => {
            speedDispatch({
                type: "SPEED",
                newSpeed: e.target.value
            })
        }, 1800);
    }

    // SET THE SLIDER SPEED VALUE IN LOCALSTORAGE
    useEffect(() => {
        window.localStorage.setItem("SLIDER_SPEED", speedState.speed)
    }, [speedState.speed])

    // RESET DEFAULT SPEED FUNCTION
    const defaultSpeed = () => {
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

    // LOADING FOR SPPED FUNCTION
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
                    onClick={defaultSpeed}
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