import React, { useReducer, useState, useEffect } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BsArrowLeftShort } from "react-icons/bs"
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../context/AuthContext/Firebase'
import { Footer } from "../index";
import { reducer } from '../../assets/reducer'
import signUpBg from "../../assets/sign-up-bg.jpg"
import "./registration.scss"

function SignIn() {
    const [password, setPassword] = useState(true)
    const initialState = {
        errEmail: false,
        errPassword: false,
        loading: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const code = () => {
        if (document.getElementById("passwordd").type === "password") {
            setPassword(false)
            document.getElementById("passwordd").type = "text"
        } else {
            setPassword(true)
            document.getElementById("passwordd").type = "password"
        }
    }

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            // setProgress(10)
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    dispatch({
                        type: "LOADING"
                    })
                    setTimeout(() => {
                        navigate("/")
                    }, 1400);
                })
                .catch((error) => {
                    if (error.code == "auth/invalid-email" || error.code == "auth/user-not-found") {
                        dispatch({
                            type: "ERR_EMAIL"
                        })
                    }
                    if (error.code == "auth/wrong-password") {
                        dispatch({
                            type: "ERR_PASSWORD"
                        })
                    }
                    messageApi.open({
                        type: 'error',
                        content: `Error! ${error.code?.slice(5).replaceAll("-", " ")}`,
                        duration: 5
                    });
                });
        } catch {
            dispatch({ type: "LOADING_FALSE" })
        }
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

    useEffect(() => {
        setTimeout(() => {
            if (state.errPassword == true) {
                dispatch({
                    type: "ERR_PASSWORD_RETURN"
                })
            }
        }, 1000);
    }, [state.errPassword])
    return (
        <>
            {contextHolder}
            <div className="for-bg-image" style={{ backgroundImage: `url('${signUpBg}')` }}>
                <div className="for-bg-color">
                    <div className='back'><Link to="/"><BsArrowLeftShort />Home</Link></div>
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
                                            <input type="email" placeholder='Email' className={`${state.errEmail ? "err" : ""}`} />
                                            <label htmlFor="#password">
                                                <input type="password" id='passwordd' placeholder='Password' className={`${state.errPassword ? "err" : ""}`} />
                                                {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                            </label>
                                            <p className='forgot'><Link to="/reset-password">Forgot Password?</Link></p>
                                            {!state.loading ?
                                                <button>
                                                    Continue <MdKeyboardArrowRight />
                                                </button>
                                                :
                                                <div className="progress"></div>
                                            }
                                            <p className='already'>You need Account? <span><Link to="/sign-up">Sign Up</Link></span></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignIn