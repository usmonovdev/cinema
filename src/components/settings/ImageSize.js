import React, { useEffect } from 'react'
import { ConfigProvider, message, Radio } from 'antd'
import { MdRefresh } from 'react-icons/md'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function ImageSize() {
    const { imgState, imgDispatch, colorState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage()

    const key = "updatable"

    // CHANGE IMAGE SIZE FUNCTION
    // TARGET VALUE IN IMGDISPATCH
    const changeImageSize = (e) => {
        setTimeout(() => {
            imgDispatch({
                type: "IMAGE_SIZE",
                newSize: e.target.value
            })
        }, 1800);
    };

    // SET ITEM IN LOCALSTORAGE
    useEffect(() => {
        window.localStorage.setItem("IMAGE_QUALITY", imgState.size)
    }, [imgState.size])

    // RESET DEFAULT IMAGE SIZE FUNCTION
    // GET THE DISPATCH FUNCTION
    const defaultSize = () => {
        imgDispatch({
            type: "DEFAULT_IMAGE_SIZE"
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

    // LOADING CHANGE IMAGE SIZE
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
    
    return (
        <>
            {contextHolder}
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
        </>
    )
}

export default ImageSize