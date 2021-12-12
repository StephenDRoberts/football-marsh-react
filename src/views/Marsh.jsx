import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Camera from '../components/Camera';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import Pitches from '../components/pitch/Pitches';
import { Sizes } from '../utils/sizes';
import Floor from '../components/Floor';
import { useNavigate } from 'react-router-dom'

const Marsh = () => {
  // useNavigate needs to be setup from a main route component
  // I couldnt get it to work with a child of a connected component
  let navigate = useNavigate()

  const handleNavigate = (location) => {
    navigate(location)
  }

  if(!Sizes) return;
  return (
    <Suspense fallback={null}>
    <Canvas>
      <Camera />
      <Stats showPanel={0} className="stats" />
      <OrbitControls enableZoom={false}/>
      {/*<color attach="background" args={"#010101"} />*/}
      <fog attach="fog" args={['#ffffff', 100, 1500]} />
      <Pitches
        navigate={handleNavigate}
        pitchSize={Sizes.pitch}
      />
      <Floor />
      <Environment preset="forest" />
      {/*<ambientLight />*/}
      <axesHelper args={[50]} position={[0,Sizes.pitch.depth + 1, 0]}/>
    </Canvas>
  </Suspense>
  )
}

export default hot(Marsh);