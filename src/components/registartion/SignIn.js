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
import { message } from 'antd'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../context/AuthContext/Firebase'

function SignIn() {
    const [password, setPassword] = useState(true)
    const code = () => {
        if (document.getElementById("passwordd").type === "password") {
            setPassword(false)
            document.getElementById("passwordd").type = "text"
        } else {
            setPassword(true)
            document.getElementById("passwordd").type = "password"
        }
    }

    const { colorState } = useMovieContext()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const [isProgress, setIsProgress] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email, password)
        try {
            signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Failed in create account!',
            });
        }
    }
    return (
        <>
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
                                <button><Link to="/sign-up">Sign In</Link></button>
                            </div>
                            <div className="reg-box">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Email' />
                                    <label htmlFor="#password">
                                        <input type="password" id='passwordd' placeholder='Passowrd' />
                                        {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                    </label>
                                <p className='forgot'>Forgot Password?</p>
                                <button>Continue <MdKeyboardArrowRight /></button>
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

export default SignIn