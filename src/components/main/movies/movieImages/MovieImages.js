import axios from 'axios'
import React from 'react'
import "../../../navbar/navbar.scss"
import "./movieImages.scss"
import "../../../../assets/slick.css"
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from 'react-slick'
import { useRef } from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Image } from 'antd'
import { reducer } from '../../../../assets/reducer'
import { useReducer } from 'react'
import { BsImageFill } from "react-icons/bs"
import { motion } from 'framer-motion'
import logo from "../../../../assets/movie-photo-not-downloaded.jpg"
const API = "https://api.themoviedb.org/3/movie/"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function MovieImages({ moviesId }) {
    const [state, dispatch] = useReducer(reducer, { imageSize: "original" })
    const [photos, setPhotos] = useState([])
    const customeSlider = useRef();
    useEffect(() => {
        axios.get(`${API}${moviesId}/images?api_key=${API_KEY}`)
            .then((data) => {
                setPhotos(data.data.backdrops)
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
                        Photos
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
                {photos?.length !== 0 ? <>
                    <Image.PreviewGroup>
                        <Slider {...settings} ref={customeSlider}>
                            {photos?.map((data, key) => {
                                return (
                                    <div className="actor" key={key}>
                                        <Image
                                            className='movie-photo'
                                            style={{ width: "100%" }} id='actorImage'
                                            src={`https://image.tmdb.org/t/p/${state.imageSize}/${data.file_path}`}
                                            alt={data.name}
                                            fallback={logo}
                                        />
                                    </div>
                                )
                            })}
                        </Slider>
                    </Image.PreviewGroup>
                </> : <div className='no-photo'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: -360, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <BsImageFill className='icon'/>
                    </motion.div>
                    <p>No Photos!</p>
                </div>}

            </div>
        </div>
    )
}

export default MovieImages