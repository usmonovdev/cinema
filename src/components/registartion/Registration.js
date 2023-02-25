import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import SignUp from './SignUp'
import SignIn from './SignIn'
import "./registration.scss"

function Registration() {
    const [register, setRegister] = useState(true)
    return (
        <>
            <Navbar />
            <div className="container">
                <div className='register-page'>
                    <div className="box">
                        <div className='links'>
                            <button onClick={() => setRegister(!register)}>{`${register ? "Sign Up" : "Sign In"}`}</button>
                        </div>
                        {register ? <>
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
                                <div className='reg-box'>
                                    <SignUp />
                                </div>
                            </motion.div>
                        </> : <>
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                exit={{ opacity: 0, x: -100, transition: { duration: 0 } }}
                            >
                                <div className='reg-box'>
                                    <SignIn />
                                </div>
                            </motion.div>
                        </>}
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default Registration