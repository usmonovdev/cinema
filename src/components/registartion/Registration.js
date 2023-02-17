import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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

    const data = {
        username: "johnny_appleseed",
        password: "test123",
        request_token: `${token}`
    }

    useEffect(() => {
        axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, data)
            .then((data) => {
                setLogin(data)
            })
    })
    console.log(login)
    return (
        <div>
            <p>Token: <a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/register`}>Link</a></p>
        </div>
    )
}

export default Registration