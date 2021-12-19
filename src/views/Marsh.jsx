import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Camera from '../components/Camera';
import { Environment, OrbitControls, ScrollControls, Stats, TrackballControls } from '@react-three/drei';
import Pitches from '../components/pitch/Pitches';
import { Sizes } from '../utils/sizes';
import Floor from '../components/surroundings/Floor';
import { useNavigate } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion';
import Trees from '../components/surroundings/Trees';

const Marsh = () => {
  // useNavigate needs to be setup from a main route component
  // I couldnt get it to work with a child of a connected component
  let navigate = useNavigate()

  const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.9]
  }

  const handleNavigate = (location) => {
    navigate(location)
  }

  const slidingPage = {
    initial: {
      opacity: 0
      // width: 0
    },
    animate: {
      opacity: 1
      // width: '100vw'
    },
    exit: {
      opacity: 0
      // width: 0
    },
    transition : {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.9]
    }
  }

  if(!Sizes) return;
  return (
    <motion.div
      className={'loader'}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={slidingPage}
    >
      <Suspense fallback={null}>
      <Canvas>
        <Camera position={[0, 160, 300]}/>
        <Stats showPanel={0} className="stats" />
        <OrbitControls enableZoom={false}/>
        {/*<color attach="background" args={"#010101"} />*/}
        <fog attach="fog" args={['#ffffff', 100, 1500]} />
          <Pitches
            navigate={handleNavigate}
            pitchSize={Sizes.pitch}
          />
        <Trees />
        <Floor />
        <Environment preset="forest" />
        {/*<ambientLight />*/}
        <axesHelper args={[50]} position={[0,Sizes.pitch.depth + 1, 0]}/>
      </Canvas>
    </Suspense>
    </motion.div>
  )
}

export default hot(Marsh);