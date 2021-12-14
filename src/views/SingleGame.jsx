import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SingleGame = () => {
  return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
      <Link to="/">Home</Link>
    </motion.div>
  )
}

export default SingleGame;