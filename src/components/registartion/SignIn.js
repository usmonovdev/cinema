import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function SignIn() {
    const [register, setRegister] = useState(true)
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
                                <form>
                                    <input type="text" placeholder='Email' />
                                    <label htmlFor="#password">
                                        <input type="password" id='passwordd' placeholder='Passowrd' />
                                        {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                    </label>
                                </form>
                                <p className='forgot'>Forgot Password?</p>
                                <button>Continue <MdKeyboardArrowRight /></button>
                                <p className='already'>You need Account? <span><Link to="/sign-up">Sign Up</Link></span></p>
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