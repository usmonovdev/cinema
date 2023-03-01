import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../context/AuthContext/Firebase'

function SignOut() {
    const navigate = useNavigate()
    const handleSignOut = () => {
        setTimeout(() => {
            signOut(auth).then(() => {
                console.log("Sign-out succesful")
                navigate("/")
            }).catch((error) => {
                console.log(error, "error")
            });
        }, 2300);

    }
    return (
        <div>
            <p>Sign Out</p>
            <button onClick={handleSignOut}>button</button>
        </div>
    )
}

export default SignOut