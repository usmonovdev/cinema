import React from 'react'
import { MdBackHand } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import "./bannedContent.scss"

function LimitedContent() {
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
                <p><span className='limited-content'>Banned Movie.</span><br /> Please back to <Link to="/">Home</Link> page.</p>
                Or <Link to="/movies">back to Movies</Link>
            </div>
        </div>
    )
}

export default LimitedContent