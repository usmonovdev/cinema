import axios from 'axios'
import React from 'react'
import "../../../navbar/navbar.scss"
import "./actors.scss"
import "../../../../assets/slick.css"
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from 'react-slick'
import { useRef } from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function Actors({ moviesId }) {
    const [actors, setActors] = useState([])
    const customeSlider = useRef();

    const filterActors = actors?.filter(data => {
        return data.profile_path !== null
    });

    useEffect(() => {
        axios.get(`${API}${moviesId}/credits?api_key=${API_KEY}`)
            .then((data) => {
                setActors(data.data.cast)
            });
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    const previous = () => {
        customeSlider.current.slickNext()
    }
    const next = () => {
        customeSlider.current.slickPrev()
    }
    return (
        <div className='container'>
            <div className="actors-box">
                <div className="actors-title">
                    <h1 className='title'>
                        <span className='sharp'>#</span>
                        Actors
                    </h1>
                    <div className='slider-buttons'>
                        <button className='buttonSlider right' onClick={next} >
                            <BiLeftArrowAlt />
                        </button>
                        <button className='buttonSlider left' onClick={previous}>
                            <BiRightArrowAlt />
                        </button>
                    </div>
                </div>
                <Slider {...settings} ref={customeSlider}>
                    {filterActors?.map((data) => {
                        return (
                            <div className="actor" key={data.id}>
                                <img style={{ width: "100%" }} id='actorImage' src={`https://image.tmdb.org/t/p/original/${data.profile_path}`} alt={data.name} />
                                <p>{data.name}</p>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Actors