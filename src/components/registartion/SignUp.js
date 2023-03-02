import React, { useEffect, useReducer, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BiImage } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ConfigProvider, message, Progress } from 'antd'
import { auth, db, storage } from '../../context/AuthContext/Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import { reducer } from '../../assets/reducer'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import image from "../../assets/user-not-downloaded.jpg"
import "./registration.scss"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext/AuthContext'

function SignUp() {
    const { currentUser } = useContext(AuthContext)
    const { colorState } = useMovieContext()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [password, setPassword] = useState(true)
    // const [loading, setLoading] = useState(true)
    const [isProgress, setIsProgress] = useState()
    const initialState = {
        errEmail: false,
        errPassword: false,
        loading: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const code = () => {
        if (document.getElementById("password").type === "password") {
            setPassword(false)
            document.getElementById("password").type = "text"
        } else {
            setPassword(true)
            document.getElementById("password").type = "password"
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            await uploadBytesResumable(storageRef, displayName).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "userMovies", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                        like: "like"
                    });
                    navigate("/")
                });
            });
        } catch (err) {
            console.log("Error")
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
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Username' />
                                    <input type="email" placeholder='Email' className={`${state.errEmail ? "err" : ""}`} />
                                    <label htmlFor="#password">
                                        <input type="password" id='password' className={`${state.errPassword ? "err" : ""}`} placeholder='Password' />
                                        {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                    </label>
                                    <button>
                                        {state.loading ? <div className='spin'></div> : <>Continue <MdKeyboardArrowRight /></>}
                                    </button>
                                </form>
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