import axios from 'axios'
import "../home/home.scss"
import "./actors.scss"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from "../../footer/Footer"
import BannedContent from "../../BannedContent/BannedContent"
import Navbar from '../../navbar/Navbar'
import { Image } from 'antd'
import { initial } from '../../../assets/reducer'

function ActorOpen() {
    const { actorId } = useParams()
    const API = "https://api.themoviedb.org/3/person/"
    const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
    const [actor, setActor] = useState([])
    useEffect(() => {
        try {
            axios.get(`${API}${actorId}?api_key=${API_KEY}`)
                .then((data) => {
                    setActor(data.data)
                    console.log(data.data)
                })
        } catch (error) {
            console.log("API Error", error)
        }
    }, [])

    const { adult, birthday, biography, name, place_of_birth, profile_path, gender } = actor

    return (
        <div>
            {!adult ? <>
                <Navbar />
                <div className='bg-image'
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/${initial.size}/${profile_path}")`
                    }}
                >
                    <div className="backdrop">
                        <div className="container">
                            <p>{name}</p>
                            {gender == "2" ? <p>🚹</p> : <p>1🚺</p>}
                            <p>{birthday?.replaceAll("-", " ")}</p>
                            <p>{place_of_birth}</p>
                            <p>{biography}</p>
                            <Image
                                width="100px"
                                src={`https://image.tmdb.org/t/p/${initial.size}/${profile_path}`}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <>
                <BannedContent />
                <Footer />
            </>}
        </div>
    )
}

export default ActorOpen