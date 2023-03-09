import React, { useEffect, useReducer } from 'react'
import { reducer } from '../../assets/reducer'
import { RiMicLine, RiMicOffLine, RiMovie2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { AiOutlineStar } from 'react-icons/ai'
import { BiDollar } from "react-icons/bi"
import { VscPlay } from "react-icons/vsc"
import { motion } from 'framer-motion'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios'
import { message } from 'antd'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Search() {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const initialState = {
        apiData: [],
        inputValue: `${transcript.length > 0 ? transcript : ""}`
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const handleInput = (e) => {
        dispatch({
            type: "INPUT_VALUE",
            newInputValue: e
        });
    }

    useEffect(() => {
        dispatch({
            type: "INPUT_VALUE",
            newInputValue: transcript
        });
    }, [transcript])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${state.inputValue}`)
            .then((data) => {
                dispatch({
                    type: "SEARCH",
                    newApiData: data.data.results
                })
            })
    }, [state.inputValue]);

    // START LISTENING
    const goVoice = () => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({
                continuous: false
            })
        } else {
            messageApi.open({
                type: 'error',
                content: "Your browser not supported voice search!",
                duration: 5
            });
        }
    }

    // FOR OPEN MICROPHONE SHORTCUT
    // M + O
    useEffect(() => {
        window.addEventListener("keyup", e => {
            if (e.key.toLowerCase() === "m", e.key.toLowerCase() === "o") {
                SpeechRecognition.startListening({
                    continuous: false
                })
            }
        })
    }, [])

    // FOR CLOSE MICROPHONE SHORTCUT
    // M + C
    useEffect(() => {
        window.addEventListener("keyup", e => {
            if (e.key.toLowerCase() === "m", e.key.toLowerCase() === "c") {
                SpeechRecognition.stopListening()
            }
        })
    }, [])

    return (
        <>
            {contextHolder}
            <div className='search-result'>
                <div className='top'>
                    <input
                        type="text"
                        className='input'
                        placeholder='Search...'
                        onChange={(e) => handleInput(e.target.value)}
                        value={state.inputValue}
                    />
                    {listening ?
                        <RiMicLine
                            onClick={SpeechRecognition.stopListening}
                        /> :
                        <RiMicOffLine
                            onClick={goVoice}
                        />
                    }
                </div>
                <div className='bottom'>
                    {state.apiData?.length > 0 ?
                        <ul>
                            {state.apiData?.map((data) => {
                                const { id, name, title, popularity, vote_average, media_type } = data
                                const newName = name?.length > "20" ? `${name.slice(0, 25)}...` : name
                                const newTitle = title?.length > "20" ? `${title.slice(0, 25)}...` : title

                                const imya = newName ? newName : newTitle
                                return (
                                    <li key={id}>
                                        <motion.div
                                            initial={{ scaleY: 0, y: 150 }}
                                            animate={{ scaleY: 1, y: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                        >
                                            <Link to={`${media_type == "movie" ? "/movie" : media_type == "person" ? "/actor" : "/show"}/${id}`}>
                                                <h3>{imya}</h3>
                                            </Link>
                                            <div className='small-info'>
                                                <p><BiDollar /> {popularity}k</p>
                                                <p><AiOutlineStar /> {vote_average?.toString().slice(0, 3)}</p>
                                                <p><VscPlay /> {media_type}</p>
                                            </div>
                                        </motion.div>
                                    </li>
                                )
                            })}
                        </ul>
                        : <motion.div
                            initial={{ scaleY: 0, y: 300 }}
                            animate={{ scaleY: 1, y: 200 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <div className='not-found'>
                                <RiMovie2Line />
                                <p>No items!</p>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    )
}

export default Search