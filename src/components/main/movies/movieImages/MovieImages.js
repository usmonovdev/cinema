import React, { useState, useEffect, useRef } from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Image } from 'antd'
import { useMovieContext } from '../../../../context/MovieContex/MovieContex'
import { LoadImage } from "../../../index"
import Slider from 'react-slick'
import axios from 'axios'
import logo from "../../../../assets/movie-photo-not-downloaded.jpg"
import "../../../navbar/navbar.scss"
import "./movieImages.scss"
import "../../../../assets/slick.css"
import "../liked.scss"
const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"

function MovieImages({ moviesId, type }) {
    const { imgState } = useMovieContext()

    // CAHNGE API LINK WITH MEDIA TYPE
    const API = `https://api.themoviedb.org/3/${type == "movie" ? "movie" : "tv"}/`
    const [photos, setPhotos] = useState([])
    const slider = useRef();

    // GET DATA WITH CHANGED LINK
    useEffect(() => {
        axios.get(`${API}${moviesId}/images?api_key=${API_KEY}`)
            .then((data) => {
                setPhotos(data.data.backdrops)
            });
    }, [moviesId]);

    // SLIDER SETTINGS
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
        slider.current.slickNext()
    }
    const next = () => {
        slider.current.slickPrev()
    }

    return (
        <>
            {photos.length > 4 ?
                <div className='container'>
                    <div className="actors-box">
                        <div className="actors-title">
                            <div className="title-info">
                                <h1><span>#</span>Photos</h1>
                                <p>Pictures from this movie</p>
                            </div>
                            <div className='slider-buttons'>
                                <button className='buttonSlider right' onClick={next} >
                                    <BiLeftArrowAlt />
                                </button>
                                <button className='buttonSlider left' onClick={previous}>
                                    <BiRightArrowAlt />
                                </button>
                            </div>
                        </div>
                        <Image.PreviewGroup>
                            <Slider {...settings} ref={slider}>
                                {photos?.map((data, key) => {
                                    return (
                                        <div className="actor" key={key}>
                                            <Image
                                                className='movie-photo'
                                                style={{ width: "100%" }} id='actorImage'
                                                src={`https://image.tmdb.org/t/p/${imgState.size}/${data.file_path}`}
                                                alt={data.name}
                                                fallback={logo}
                                                placeholder={
                                                    <LoadImage />
                                                }
                                            />
                                        </div>
                                    )
                                })}
                            </Slider>
                        </Image.PreviewGroup>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default MovieImages