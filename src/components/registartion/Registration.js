import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Registration() {
    return (
        <div>
            <Navbar />
            Registration
            <Footer />
        </div>
    )
}

export default Registration