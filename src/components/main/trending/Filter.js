import React from 'react'
import { motion } from "framer-motion"
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import "./filter.scss"

function Filter() {
    const { movie } = useMovieContext()
    console.log(movie)
    return (
        <motion.div
            className='filter-container'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
            
        </motion.div>
    )
}

export default Filter