import React, { useState, useContext, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiSearch } from "react-icons/bi"
import { RiMovie2Line, RiBearSmileLine, RiHome2Line, RiSettingsLine } from "react-icons/ri"
import { MdSlideshow } from "react-icons/md"
import { motion } from "framer-motion"
import { useMovieContext } from '../../context/MovieContex/MovieContex'
import { Drawer, Image } from 'antd'
import { reducer } from '../../assets/reducer'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import Hamburger from 'hamburger-react'
import logo from "../../assets/logo-white.png"
import Search from './Search'
import "./navbar.scss"

function Navbar() {
    const { currentUser } = useContext(AuthContext)
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
            if (e.key === "Control", e.key === "/") {
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
                    <Link to="/"><img src={logo} alt="Logo" />CINEEMA</Link>
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
                            {currentUser?.uid == null ?
                                <>
                                    <Link to="/sign-up" className='sign-in' style={{ backgroundColor: colorState.color }}>
                                        <li>Sign Up</li>
                                    </Link>
                                </> :
                                <Link to="/settings">
                                    <Image
                                        className='user-photo'
                                        preview={false}
                                        src={currentUser.photoURL}
                                    />
                                    <p className='user-name'>{currentUser?.displayName}</p>
                                </Link>
                            }
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