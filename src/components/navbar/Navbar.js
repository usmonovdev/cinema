import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-white.png"
import { BiSearch } from "react-icons/bi"
import { RiMovie2Line, RiBearSmileLine, RiHome2Line, RiSettingsLine } from "react-icons/ri"
import { MdSlideshow } from "react-icons/md"
import "./navbar.scss"
import Hamburger from 'hamburger-react'
import { motion } from "framer-motion"
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import Search from './Search'
import { Drawer } from 'antd'
import { useEffect } from 'react'
import { reducer } from '../../assets/reducer'
import { useReducer } from 'react'

function Navbar() {
    const { colorState } = useMovieContext()
    const initialState = {
        drawer: false
    }
    const [isOpen, setOpen] = useState(false)
    const [classAdd, setClassAdd] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)

    const showDrawer = () => {
        dispatch({
            type: "DRAWER_OPEN"
        })
    };
    const onClose = () => {
        dispatch({
            type: "DRAWER_CLOSE"
        })
    };

    useEffect(() => {
        window.addEventListener("keyup", e => {
            if(e.key.toLowerCase() == "m" && e.ctrlKey) {
                dispatch({
                    type: "DRAWER_OPEN"
                })
            }
        })
    }, [])

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
                            <li><Link onClick={showDrawer}><BiSearch className='link-icon' />Search</Link></li>
                        </ul>
                        <ul className='user'>
                            <Link to="/register" className='sign-in' style={{ backgroundColor: colorState.color }}>
                                <li>Sign In</li>
                            </Link>
                        </ul>
                    </div>
                </header>
            </motion.div>
            <Drawer
                title="Search Movie and Actors"
                onClose={onClose}
                open={state.drawer}
                placement={"right"}
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