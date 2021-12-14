import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SingleGame = () => {
  const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.9]
  }

  return (
    <motion.div
        initial={{opacity: 0,}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={transition}
      >
      <Link to="/">Home</Link>
    </motion.div>
  )
}

export default SingleGame;