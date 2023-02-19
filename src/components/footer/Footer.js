import React from 'react'
import "../navbar/navbar.scss"
import "./footer.scss"
import { AiOutlineWarning } from "react-icons/ai"
import { Link } from 'react-router-dom'
import GitHubButton from 'react-github-btn'

function Footer() {
    return (
        <footer>
            <div className='container'>
                <div className='infoFooterTop'>
                    <ul>
                        <li>
                            <p className='title'><span>Resources</span></p>
                        </li>
                        <li><a href="https://github.com/usmonovdev/cinema" target="_blank">GitHub Repository</a></li>
                        <li><a href="https://github.com/usmonovdev/cinema#readme" target="_blank">GitHub Readme</a></li>
                        <li><a href="https://app.netlify.com/sites/shiny-dasik-b311f7/deploys" target="_blank">Netlify Deploy</a></li>
                        <li><a href="https://developers.themoviedb.org/3" target="_blank">Api</a></li>
                    </ul>
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
                            <p className='title'><span>Social</span></p>
                        </li>
                        <li><a href="https://t.me/usmonov_ku" target="_blank">Telegram</a></li>
                        <li><a href="https://github.com/usmonovdev" target="_blank">GitHub</a></li>
                    </ul>
                </div>
                <div className='infoFooterBottom'>
                    <p><span><AiOutlineWarning /></span> I do not guarantee the accuracy of the information provided in the films.</p>
                    <p>Programmer & Designer <span><a href="https://github.com/usmonovdev" target="_blank">Usmonov Azizbek.</a></span></p>
                    <p>
                        <GitHubButton href="https://github.com/usmonovdev/cinema" data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;" data-size="large" data-show-count="true" aria-label="Star usmonovdev/cinema on GitHub">Star</GitHubButton>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer