import React from 'react'
import { MdBackHand } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function PageNotFound() {
    return (
        <div className="cencored-content">
            <div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: -360, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <MdBackHand className='hand-icon' />
                </motion.div>
                <h3>404 Error</h3>
                <p>Sorry page not found!<br/> Please back to <Link to="/">Home</Link> page.</p>
            </div>
        </div>
    )
}

export default PageNotFound