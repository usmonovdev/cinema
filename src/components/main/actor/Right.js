import { Button, ConfigProvider, Drawer, Space, Tooltip } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { AiOutlineHeart, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import { RxShare1 } from 'react-icons/rx';
import { reducer } from '../../../assets/reducer';
import Role from './Role';

function Right({ actor }) {
    const initialState = {
        info: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const { name, birthday, biography, place_of_birth } = actor;

    const allInfo = () => {
        dispatch({ type: "OPEN_TRUE" })
    };

    const onClose = () => {
        dispatch({ type: "OPEN_FALSE" })
    };

    const sharedData = {
        title: `Share Actor - ${name}`,
        text: `${name}`,
        url: window.location
    }

    const share = () => {
        navigator.share(sharedData)
    }

    useEffect(() => {
        document.title = `Actor - ${name}`
    });

    return (
        <div className="right">
            <h1>{name}</h1>
            {birthday ? <p className='birthday'>Birthday: {birthday?.replaceAll("-", "/")}</p> : ""}
            {place_of_birth ? <p className='birthday'>{place_of_birth}</p> : ""}
            {biography ? <p>{biography?.slice(0, 500)}</p> : ""}
            {state.info ? <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#e6b31e"
                        }
                    }}
                >
                    <Drawer
                        title={name}
                        onClose={onClose}
                        width={800}
                        open={state.info}
                        placement={"bottom"}
                        extra={
                            <Space>
                                <Button type="primary" onClick={onClose}>
                                    OK
                                </Button>
                            </Space>
                        }
                    >
                        <Role/>
                    </Drawer>
                </ConfigProvider> : ""}
            <div className="events-box">
                <Tooltip placement="bottom" title={"Mark As Fovorite"} color={"#343434"}>
                    <AiOutlineHeart className='events' />
                </Tooltip>
                <Tooltip placement="bottom" title={"Rate It!"} color={"#343434"}>
                    <AiOutlineStar className='events' />
                </Tooltip>
                <AiOutlineInfoCircle className='events allInfo' onClick={allInfo} />
                <Tooltip placement="bottom" title={"Share Movie"} color={"#343434"}>
                    <RxShare1 className='events' onClick={share} />
                </Tooltip>
            </div>
        </div>
    )
}

export default Right