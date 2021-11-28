import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';

const Camera = () => {
  return (
    <PerspectiveCamera
      makeDefault
      position={[-130, 130, 215]}
      fov={40}
      near={0.1}
      far={2000}
      />
  )
}

export default Camera;