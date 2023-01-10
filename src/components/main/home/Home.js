import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Home() {
    const [firstPage, setFirstPage] = useState({
        name: "",
        img: ""
    })
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then((res) => {
            // setFirstPage({
            //     name: res.data.original_title,
            //     img: `https://image.tmdb.org/t/p/w200/${res.data.backdrop_path}`
            // })
            console.log(res)
        })
    }, [])
  return (
    <>
    <Navbar />
    <div className="container">
        <h1>{firstPage.name}</h1>
        <img src={firstPage.img} alt="" />
    </div>
    </>
  )
}

export default Home