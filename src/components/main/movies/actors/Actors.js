import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import "../../../navbar/navbar.scss"
import "./actors.scss"
import "../../../../assets/slick.css"
import Slider from 'react-slick'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Image } from 'antd'
import actor from "../../../../assets/actor-photo-not-downloaded.jpg"
import { Link } from 'react-router-dom'
import { useMovieContext } from '../../../../context/MovieContex/MovieContex'

function Actors({ moviesId, type }) {
    const { imgState } = useMovieContext()
    const API = `https://api.themoviedb.org/3/${type == "movie" ? "movie" : "tv"}/`
    const API_KEY = "917c387c9e20da3ba121bafdd8e7df79"
    const [actors, setActors] = useState([]);

    const customeSlider = useRef(null);

    const filterActors = actors?.filter(data => {
        return data.profile_path !== null
    });

    useEffect(() => {
        axios.get(`${API}${moviesId}/credits?api_key=${API_KEY}`)
            .then((data) => {
                setActors(data.data.cast)
            });
    }, [moviesId]);

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
        <>
            {actors.length > 4 ?
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
                                    <Link 
                                        to={`/actor/${data.id}`}
                                        key={data.id}
                                        className="actorLink"
                                    >
                                        <div className="actor">
                                            <Image
                                                preview={false}
                                                style={{ width: "100%" }}
                                                id='actorImage'
                                                src={`https://image.tmdb.org/t/p/${imgState.size}/${data.profile_path}`}
                                                alt={data.name}
                                                fallback={actor}
                                            />
                                            <p>{data.name}</p>
                                        </div>
                                    </Link>

                                )
                            })}
                        </Slider>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default Actors