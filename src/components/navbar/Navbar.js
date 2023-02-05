import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-white.png"
import { BiMicrophone } from "react-icons/bi"
import { RiMovie2Line, RiBearSmileLine, RiHome2Line } from "react-icons/ri"
import { MdSlideshow } from "react-icons/md"
import "./navbar.scss"
import Hamburger from 'hamburger-react'
import { motion } from "framer-motion"

function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const [classAdd, setClassAdd] = useState(true)
    return (
        <div className="container">
            <header>
                <Link to="/"><img src={logo} alt="Logo" />Media</Link>
                <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                    onToggle={toggled => {
                        if (toggled) {
                            setClassAdd(false)
                        } else {
                            setClassAdd(true)
                        }
                    }} />
                <div className={`links-box ${classAdd ? "" : "active"}`}>
                    <ul className='links'>
                        <li><RiHome2Line className='link-icon' />Home</li>
                        <li><RiMovie2Line className='link-icon' />Movies</li>
                        <li><MdSlideshow className='link-icon' />TV Shows</li>
                        <li><RiBearSmileLine className='link-icon' />Cartoons</li>
                    </ul>
                    <ul className='user'>
                        <li className='inp-and-sign'>
                            <input className='search-input' type="text" placeholder='Search for Movies...' />
                            <BiMicrophone className='search-voice' />
                        </li>
                        <Link to="/register" className='sign-in'>
                            <li>Sign In</li>
                        </Link>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Navbar