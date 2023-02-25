import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function SignUp() {
    const [password, setPassword] = useState(true)
    const code = () => {
        if (document.getElementById("password").type === "password") {
            setPassword(false)
            document.getElementById("password").type = "text"
        } else {
            setPassword(true)
            document.getElementById("password").type = "password"
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
                                <button><Link to="/sign-in">Sign Up</Link></button>
                            </div>
                            <div className="reg-box">
                                <form>
                                    <input type="text" placeholder='Username' />
                                    <input type="email" placeholder='Email' />
                                    <label htmlFor="#password">
                                        <input type="password" id='password' placeholder='Password' />
                                        {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                    </label>
                                </form>
                                <button>Continue <MdKeyboardArrowRight /></button>
                                <p className='already'>Already registered? <span><Link to="/sign-in">Sign In</Link></span></p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
            <Footer />
        </>
    )
}

export default SignUp