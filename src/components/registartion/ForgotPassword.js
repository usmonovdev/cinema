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

function ForgotPassword() {
    const { colorState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const [isProgress, setIsProgress] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(false)
        setIsProgress(0)
        const email = e.target[0].value;
        setTimeout(() => {
            try {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        setLoading(true)
                        setIsProgress(100)
                        console.log("Check your account!")
                    })
                    .catch((error) => {
                        console.log("error!")
                    });
            } catch (err) {
                messageApi.open({
                    type: 'error',
                    content: 'Failed in create account!',
                });
            }
        }, 2300);
    }
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
                                    <input type="text" placeholder='Email' />
                                    {loading ?
                                        <button>
                                            Reset Password <MdKeyboardArrowRight />
                                        </button>
                                        :
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorTextBase: "#fff",
                                                }
                                            }}
                                        >
                                            <Progress
                                                percent={isProgress}
                                                status="active"
                                                strokeColor={colorState.color}
                                                strokeWidth={"40px"}
                                                showInfo={false}
                                                strokeLinecap="butt"
                                            />
                                        </ConfigProvider>
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