import React, { useEffect, useRef } from 'react';
import { generatePitchCoordinates } from '../../utils/coordinates';
import Pitch from './Pitch';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Hoardings from './Hoardings';
import { easeInSine } from '../../utils/easings/functions';

const Pitches = ({ pitchSize, navigate, count = 100, temp = new THREE.Object3D(), matrix = new THREE.Matrix4() }) => {
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
      ref.current.steve = 'steve'
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true

  },[])

  const handleWheelEvent = (event) => {
    event.preventDefault
    speed += event.deltaY * 0.05
  }



  const handleClickEvent = (event) => {
    event.stopPropagation()
    const instanceId = event.instanceId
    ref.current.getMatrixAt(instanceId, matrix)
    let tempObj = new THREE.Object3D()
    matrix.decompose(tempObj.position, tempObj.quaternion, tempObj.scale); // now position is in tempObj.position

    let timer
    let elapsed = 0
    timer = setInterval((ev) => {
      elapsed ++

      // const easedOffset =   easeInElastic(elapsed / 10)
      const easedOffset = -0.8 * easeInSine(elapsed / 4)
      // const easedOffset = -1.9 * Math.sin(elapsed / 10)

      matrix.setPosition(tempObj.position.x, tempObj.position.y, tempObj.position.z + easedOffset )

      ref.current.setMatrixAt(instanceId, matrix)
      ref.current.instanceMatrix.needsUpdate = true

      if(elapsed ==16 ) {
        clearInterval(( timer))
        setTimeout(() => navigate("/fixtureId"), 300)
      }
    }, 10)
  }

  useFrame((state) => {
    const { position } = ref.current
    zOffset += speed
    speed *= 0.90
    const newZPosition = position.z + speed
    position.set(position.x, position.y, newZPosition)
  })

  return (
    <>
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
    </>
  )
}

export default Pitches;