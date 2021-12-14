import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';

const Camera = ({ position }) => {
  return (
    <PerspectiveCamera
      makeDefault
      position={position}
      fov={40}
      near={0.1}
      far={2000}
      />
  )
}

export default Camera;