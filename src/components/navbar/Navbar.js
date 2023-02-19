import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-white.png"
import { BiMicrophone } from "react-icons/bi"
import { RiMovie2Line, RiBearSmileLine, RiHome2Line, RiSettingsLine } from "react-icons/ri"
import { MdSlideshow } from "react-icons/md"
import "./navbar.scss"
import Hamburger from 'hamburger-react'
import { motion } from "framer-motion"
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import Search from './Search'
import { Button, Drawer, Space } from 'antd'
import SearchTitle from './SearchTitle'

function Navbar() {
    const { colorState } = useMovieContext()
    const [isOpen, setOpen] = useState(false)
    const [classAdd, setClassAdd] = useState(true)
    const [drawer, setDrawer] = useState(false)

    const showDrawer = () => {
        setDrawer(true)
    };
    const onClose = () => {
        setDrawer(false);
    };

    return (
        <div className="container">
            <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                }}
            >
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
                            <li><Link to="/"><RiHome2Line className='link-icon' />Home</Link></li>
                            <li><Link to="/movie"><RiMovie2Line className='link-icon' />Movies</Link></li>
                            <li><Link to="/show"><MdSlideshow className='link-icon' />TV Shows</Link></li>
                            <li><Link to="/actor"><RiBearSmileLine className='link-icon' />Actors</Link></li>
                            <li><Link to="/settings"><RiSettingsLine className='link-icon' />Settings</Link></li>
                        </ul>
                        <ul className='user'>
                            <li className='inp-and-sign'
                                onClick={showDrawer}
                            >
                                <input
                                    className='search-input'
                                    type="text" placeholder='Search for Movies...'
                                />
                                <BiMicrophone className='search-voice' />
                            </li>
                            <Link to="/register" className='sign-in' style={{ backgroundColor: colorState.color }}>
                                <li>Sign In</li>
                            </Link>
                        </ul>
                    </div>
                </header>
            </motion.div>
            <Drawer
                title={<SearchTitle/>}
                onClose={onClose}
                width={800}
                open={drawer}
                placement={"right"}
                size="large"
                style={{
                    height: "100vh"
                }}
            >
                <Search />
            </Drawer>

        </div>
    )
}

export default Navbar