import React, { useEffect, useRef } from 'react';
import { generatePitchCoordinates } from '../../utils/coordinates';
import Pitch from './Pitch';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sizes } from '../../utils/sizes';
import Hoardings from './Hoardings';

const Pitches = ({ pitchSize, count = 100, temp = new THREE.Object3D() }) => {
  const ref = useRef()
  let zOffset = 0
  let speed = 0

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const column = i % 5
      const row = Math.trunc(i / 5)
      const coordinates = generatePitchCoordinates(pitchSize, row, column)

      // I have no idea why Z needs to be in Y and why it has to be negative
      // but otherwise it doesn't work :(
      temp.position.set(
        coordinates.pitch.pitchX,
        - coordinates.pitch.pitchZ,
        coordinates.pitch.pitchY,
      )
      temp.updateMatrix()

      const id = i
      ref.current.setMatrixAt(id, temp.matrix)
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true

  },[])

  const handleWheelEvent = (event) => {
    event.preventDefault
    speed += event.deltaY * 0.05
  }

  const handleClickEvent = (event) => {
    event.preventDefault
    // console.log(event)
    // console.log(ref.current)
    // console.log(ref.current.getMatrixAt(event.instanceId, ref.current.instanceMatrix.array))
  }

  useFrame((state) => {
    const { position } = ref.current
    zOffset += speed
    speed *= 0.90
    const newZPosition = position.z + speed
    position.set(position.x, position.y, newZPosition)
  })

  return (
    <instancedMesh
      ref={ref}
      onClick={handleClickEvent}
      onWheel={handleWheelEvent}
      args={[null, null, count]}
      rotation={[-Math.PI * 0.5, 0, 0]}
    >
      <Pitch />
      <Hoardings pitchSize={pitchSize}/>
    </instancedMesh>
  )
}

export default Pitches;