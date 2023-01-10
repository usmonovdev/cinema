import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo-white.png"
import { BiMicrophone } from "react-icons/bi"
import "./navbar.scss"
import Hamburger from 'hamburger-react'

function Navbar() {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className="container">
      <header>
        <Link to="/"><img src={logo} alt="Logo" /> Media</Link>
        <div className='links-box'>
          <ul className='links'>
            <li>Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>Cartoons</li>
          </ul>
          <ul className='user'>
            <li className='inp-and-sign'>
              <input className='search-input' type="text" placeholder='Search for Movies...' />
              <BiMicrophone className='search-voice' />
            </li>
            <li><Link to="/register" className='sign-in'>Sign In</Link></li>
          </ul>
        </div>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </header>
    </div>
  )
}

export default Navbar