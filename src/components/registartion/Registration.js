import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Registration() {
    const [token, setToken] = useState([])
    const [login, setLogin] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
            .then((token) => {
                setToken(token.data.request_token)
                console.log(token.data.request_token)
            })
    }, [])
    // console.log(login)

    useEffect(() => {
        axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, token)
        .then((data) => {
            console.log(data)
        })
    })
    return (
        <div>
            <Navbar />
            <p>Token: <a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/register`}>Link</a></p>
            <Footer />
        </div>
    )
}

export default Registration