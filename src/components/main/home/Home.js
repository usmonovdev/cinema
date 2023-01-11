import axios from 'axios'
import "./home.scss"
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState({
        img: "",
        title: ""
    })
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
            .then((res) => {
                setFirstPage({
                    img: `https://image.tmdb.org/t/p/original/${res.data.results[4].backdrop_path}`,
                    title: res.data.results[2].title
                })
                console.log(res)
            })
    }, [])
    console.log(firstPage)
    return (
        <>
            <Navbar />
            <div className="ads">
                <div className='bg-image' style={{ backgroundImage: `url(${firstPage.img})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}></div>
            </div>
        </>
    )
}

export default Home