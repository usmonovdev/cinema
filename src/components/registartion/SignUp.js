import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ConfigProvider, message, Progress } from 'antd'
import { auth, db, storage } from '../../context/AuthContext/Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import "./registration.scss"
import { BiImage } from 'react-icons/bi'
import { useMovieContext } from '../../context/MovieContex/MovieContex'

function SignUp() {
    const { colorState } = useMovieContext()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [password, setPassword] = useState(true)
    const [loading, setLoading] = useState(true)
    const [isProgress, setIsProgress] = useState()
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
        const file = e.target[3].files[0];
        // console.log(displayName, email, password, file)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log(progress)
                    setIsProgress(progress)
                    console.log('Upload is ' + progress + '% done');
                    progress >= "0" ? setLoading(false) : setLoading(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log("Image not uploaded!")
                },
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        navigate("/")
                    });
                }
            );
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Failed in create account!',
            });
        }
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
                                <button><Link to="/sign-in">Sign Up</Link></button>
                            </div>
                            <div className="reg-box">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Username' />
                                    <input type="email" placeholder='Email' />
                                    <label htmlFor="#password">
                                        <input type="password" id='password' placeholder='Password' />
                                        {password ? <AiOutlineEye onClick={code} /> : <AiOutlineEyeInvisible onClick={code} />}
                                    </label>
                                    <label className='label' htmlFor="image">
                                        <input type="file" accept='image/*' id='image' />
                                        <p>Profile Photo</p>
                                        <BiImage />
                                    </label>
                                    {loading ?
                                        <button>
                                            Continue <MdKeyboardArrowRight />
                                        </button>
                                        :
                                        <>

                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorPrimary: colorState.color,
                                                        colorTextBase: "#fff",
                                                        borderRadius: "0"
                                                    }
                                                }}
                                            >
                                                <Progress percent={isProgress} status="active" strokeColor={colorState.color} strokeWidth={"40px"} showInfo={false} />
                                            </ConfigProvider>
                                        </>
                                    }
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