import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "./Role.scss"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Role() {
    const { actorId } = useParams(null)
    const [role, setRole] = useState([])
    useEffect(() => {
        try {
            axios.get(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`)
                .then((data) => {
                    setRole(data.data)
                })
        } catch (error) {
            console.log("API Error", error)
        }
    }, [])
    return (
        <div>
            {role.crew?.length > 0 ? <>
                <div className='info'>
                    <p className='title'>Film crew:</p>
                    {role.crew?.map((data, key) => {
                        return (
                            <div key={key}>
                                <p>{data.title} {data.job ? <span>({data.job})</span> : ""}</p>
                            </div>
                        )
                    })}
                </div>
            </> : ""}
            {role.cast?.length > 0 ? <>
                <div className='info'>
                    <p className='title'>Film cast:</p>
                    {role.cast?.slice(0, 50).map((data, key) => {
                        return (
                            <div key={key}>
                                <p>{data.title} {data.character ? <span>({data.character})</span> : ""}</p>
                            </div>
                        )
                    })}
                </div>
            </> : ""}

        </div>
    )
}

export default Role