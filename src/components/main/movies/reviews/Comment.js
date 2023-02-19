import React, { useReducer } from 'react'
import { reducer } from '../../../../assets/reducer'

function Comment({ content }) {
    
    const initialState = {
        sliceLast: "180",
        read: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const slicedContent = content.substring(0, state.sliceLast)
    const readMore = () => {
        dispatch({ type: "READ_MORE" })
    }
    const readLess = () => {
        dispatch({ type: "READ_LESS" })
    }
    return (
        <>
            <p className='content'>
                {slicedContent}

                {/* CUT THE COMMENT AND RED MORE SOLUTION */}
                {content.length > "180" ? 
                    <>{!state.read ? "..." : ""}</> : ""
                }
            </p>
            {content.length > "180" ? 
                <>{!state.read ? 
                    <p className='read-more' onClick={readMore}>Read More</p> 
                    : 
                    <p className='read-more' onClick={readLess}>Read Less</p>
                }</>
                : ""
            }
        </>
    )
}

export default Comment