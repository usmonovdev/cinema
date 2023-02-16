import React from 'react'
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import { MdRefresh } from 'react-icons/md'
import { ConfigProvider, Switch } from 'antd'

function Animations() {
    const { colorState } = useMovieContext()

    const onChange = () => {
        console.log("for animations")
    }
    return (
        <>
            <div className='setting-title'>
                <h3>Animations</h3>
                <MdRefresh style={{ color: colorState.color }} />
            </div>
            <div className='functions animations'>
                <span>Off</span>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: colorState.color
                        }
                    }}
                >
                    <Switch
                        defaultChecked
                        onChange={onChange}
                    />
                </ConfigProvider>

                <span>On</span>
            </div>
        </>
    )
}

export default Animations