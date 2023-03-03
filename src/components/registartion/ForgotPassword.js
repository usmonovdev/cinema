import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import "./registration.scss"
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import { ConfigProvider, message, Progress } from 'antd'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../context/AuthContext/Firebase'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { reducer } from '../../assets/reducer'

function ForgotPassword() {
    const { colorState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [isProgress, setIsProgress] = useState(0)
    const navigate = useNavigate()
    const initialState = {
        errEmail: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        setTimeout(() => {
            try {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        setLoading(true)
                        setIsProgress(100)
                        messageApi.open({
                            type: 'success',
                            content: 'Check your email.',
                            duration: 5
                        });
                        setTimeout(() => {
                            navigate("/sign-in")
                        }, 1600);
                    })
                    .catch((error) => {
                        dispatch({ type: "ERR_EMAIL" })
                        messageApi.open({
                            type: 'error',
                            content: `Error! ${error.code?.slice(5).replaceAll("-", " ")}`,
                            duration: 5
                        });
                    });
            } catch {
                messageApi.open({
                    type: 'error',
                    content: 'Error in reset password!',
                });
            }
        }, 2300);
    }

    useEffect(() => {
        setTimeout(() => {
            if (state.errEmail == true) {
                dispatch({
                    type: "ERR_EMAIL_RETURN"
                })
            }
        }, 1000);
    }, [state.errEmail])

    return (
        <>
            {contextHolder}
            <Navbar />
            <div className="container">
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 0,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    exit={{ opacity: 0, x: 100, transition: { duration: 0 } }}
                >
                    <div className="register-page">
                        <div className="box">
                            <div className='links'>
                                <button>Reset Password</button>
                            </div>
                            <div className="reg-box">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Email' className={`${state.errEmail ? "err" : ""}`}/>
                                    {!loading ?
                                        <button>
                                            Reset Password <MdKeyboardArrowRight />
                                        </button>
                                        :
                                        <div className="progress"></div>
                                    }
                                    <p className='already'><span><Link to="/sign-in">Login</Link></span></p>
                                    <p className='already'>You need Account? <span><Link to="/sign-up">Sign Up</Link></span></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword