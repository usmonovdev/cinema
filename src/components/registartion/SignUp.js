import React, { useReducer, useState } from 'react'
import { ConfigProvider, message, Progress } from 'antd'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsArrowLeftShort } from "react-icons/bs"
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BiImage } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from '../../context/AuthContext/Firebase'
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import { reducer } from '../../assets/reducer'
import { Footer } from "../index"
import signUpBg from "../../assets/sign-up-bg.jpg"
import "./registration.scss"

function SignUp() {
    const { colorState } = useMovieContext()
    const [messageApi, contextHolder] = message.useMessage();
    const [password, setPassword] = useState(true)
    const [isProgress, setIsProgress] = useState()
    const navigate = useNavigate()

    const initialState = {
        errEmail: false,
        errPassword: false,
        loading: false
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    // SEE PASSWORD FUNCTION
    // CHANGE INPUT TYPE IN PASSWORD TO TEXT
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
        const file = e.target[3].files[0]
        if (file !== undefined) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const storageRef = ref(storage, displayName);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setIsProgress(progress)
                        progress >= "0" ? dispatch({ type: "LOADING" }) : dispatch({ type: "LOADING_FALSE" })
                    },
                    () => {
                        messageApi.open({
                            type: 'error',
                            content: 'Image not uploaded! Check your network.',
                            duration: 5
                        });
                    },
                    () => {
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
                            await setDoc(doc(db, "likes", res.user.uid), {})
                            navigate("/")
                        });
                    });
            } catch (err) {
                dispatch({ type: "LOADING_FALSE" })
                messageApi.open({
                    type: 'error',
                    content: 'Failed to create an account!',
                    duration: 5
                });
            }
        } else {
            messageApi.open({
                type: 'error',
                content: "No profile photo!",
                duration: 5
            });
        }
    }
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
                                            <label className='label' htmlFor="image">
                                                <input type="file" accept='image/*' id='image' />
                                                <p>Profile Photo</p>
                                                <BiImage />
                                            </label>
                                            {!state.loading ?
                                                <button>
                                                    Continue <MdKeyboardArrowRight />
                                                </button>
                                                :
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorTextBase: "#fff"
                                                        }
                                                    }}
                                                >
                                                    <Progress
                                                        percent={isProgress}
                                                        status="active"
                                                        strokeColor={colorState.color}
                                                        strokeWidth={"50px"}
                                                        showInfo={false}
                                                    />
                                                </ConfigProvider>
                                            }
                                        </form>
                                        <p className='already'>Already registered? <span><Link to="/sign-in">Sign In</Link></span></p>
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

export default SignUp