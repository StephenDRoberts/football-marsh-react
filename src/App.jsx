import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import './index.css';
import Pitches from './components/pitch/Pitches';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import Floor from './components/Floor';
import { Sizes } from './utils/sizes';
import Camera from './components/Camera';

const App = () => {
  if(!Sizes) return;
  return (
    <Suspense fallback={null}>
      <Canvas>
        <Camera />
        <Stats showPanel={0} className="stats" />
        <OrbitControls enableZoom={false}/>
        {/*<color attach="background" args={"#010101"} />*/}
        <fog attach="fog" args={['#ffffff', 100, 1500]} />
        <Pitches pitchSize={Sizes.pitch}/>

        <Floor />
        <Environment preset="forest" />
        {/*<ambientLight />*/}
        <axesHelper args={[50]} position={[0,Sizes.pitch.depth + 1, 0]}/>
      </Canvas>
    </Suspense>
  )
}

export default hot(App);