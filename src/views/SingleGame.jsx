import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Camera from '../components/Camera';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import Pitches from '../components/pitch/Pitches';
import { Sizes } from '../utils/sizes';
import Floor from '../components/surroundings/Floor';
import SinglePitch from '../components/SinglePitch';

const SingleGame = () => {
  const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.9]
  }

  return (
    <motion.div
        className={'loader'}
        initial={{opacity: 0,}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={transition}
      >
      <Link className={"link"} to="/">Back</Link>
      <Suspense fallback={null}>
        <Canvas>
          <Camera position={[100, 50, 0]}/>
          <OrbitControls enableZoom={false}/>
          {/*<color attach="background" args={"#010101"} />*/}
          <fog attach="fog" args={['#ffffff', 100, 1500]} />
          <SinglePitch
            // navigate={handleNavigate}
            pitchSize={Sizes.pitch}
          />
          <Floor />
          <Environment preset="forest" />
          {/*<ambientLight />*/}
          {/*<axesHelper args={[25]} position={[0,Sizes.pitch.depth + 1, 0]}/>*/}
        </Canvas>
      </Suspense>
    </motion.div>
  )
}

export default SingleGame;