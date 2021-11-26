import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Box= () => {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 2
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 2
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 2
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}

export default Box;