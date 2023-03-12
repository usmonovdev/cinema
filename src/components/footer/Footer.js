import React from 'react'
import { AiOutlineWarning } from "react-icons/ai"
import { Link } from 'react-router-dom'
import "../navbar/navbar.scss"
import "./footer.scss"

function Footer() {
    const createDate = new Date()
    const date = createDate.getFullYear()
    return (
        <footer>
            <div className='container'>
                <div className='infoFooterTop'>
                    <ul>
                        <li>
                            <p className='title'><span>Pages</span></p>
                        </li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/movie">Movies</Link></li>
                        <li><Link to="/show">Tv Movies</Link></li>
                        <li><Link>Sign In</Link></li>
                    </ul>
                    <ul>
                        <li>
                            <p className='title'><span>Help</span></p>
                        </li>
                        <li><a href="#" target="_blank">Terms Of Use</a></li>
                        <li><a href="https://t.me/usmonov_ku" target="_blank">Help Center</a></li>
                        <li><a href="https://t.me/usmonov_ku" target="_blank">FAQ</a></li>
                    </ul>
                    <ul>
                        <li>
                            <p className='title'><span>Resources</span></p>
                        </li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="https://developers.themoviedb.org/3" target="_blank">Api</a></li>
                    </ul>
                </div>
                <div className='infoFooterBottom'>
                    <p><span><AiOutlineWarning /></span> I do not guarantee the accuracy of the information provided in the films.</p>
                    <p>Copyright © {date}. All Rights Reserved By <span>Cineema</span></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer