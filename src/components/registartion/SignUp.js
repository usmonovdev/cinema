import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { message } from 'antd'
import { auth, db, storage } from '../../context/AuthContext/Firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import "./registration.scss"
import { BiImage } from 'react-icons/bi'

function SignUp() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(displayName, email, password, file)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            await uploadBytesResumable(storageRef, file).then(() => {
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
            })
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Failed in create account!',
            });
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const displayName = e.target[0].value
    //     const email = e.target[1].value
    //     const password = e.target[2].value
    //     const file = e.target[3].files[0]

    //     try {
    //         const res = await createUserWithEmailAndPassword(auth, email, password)
    //         const storageRef = ref(storage, displayName);
    //         const uploadTask = uploadBytesResumable(storageRef, file);
    //     } catch {
    //         messageApi.open({
    //             type: 'error',
    //             content: 'Failed in create account!',
    //         });
    //     }

    // }
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
                                        <input type="file" id='image' />
                                        <p>Profile Photo</p>
                                        <BiImage />
                                    </label>
                                    <button>Continue <MdKeyboardArrowRight /></button>
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