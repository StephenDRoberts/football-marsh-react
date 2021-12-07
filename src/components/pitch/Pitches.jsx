import React, { useEffect, useRef } from 'react';
import { generatePitchCoordinates } from '../../utils/coordinates';
import Pitch from './Pitch';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Hoardings from './Hoardings';
import TeamLogo from './TeamLogo';

const Pitches = ({ pitchSize, count = 100, temp = new THREE.Object3D(), matrix = new THREE.Matrix4() }) => {
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
      const homeLogoPositions = coordinates.homeLogo
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
    const intersection = event.intersections[0].object.position
    console.log(event.instanceId)
    ref.current.getMatrixAt(event.instanceId, matrix)

    // let newPosition = new THREE.Vector3();
    // newPosition.setFromMatrixPosition( matrix );
    // newPosition.
    //   matrix.

    let tempObj = new THREE.Object3D()

// in animation loop or anywhere else
    ref.current.getMatrixAt(event.instanceId, matrix);
    matrix.decompose(tempObj.position, tempObj.quaternion, tempObj.scale); // now position is in tempObj.position
console.log(tempObj.position)
console.log("x", tempObj.position.x)
    matrix.setPosition(tempObj.position.x, tempObj.position.y, tempObj.position.z + 20 )

    ref.current.setMatrixAt(event.instanceId, matrix)
    ref.current.instanceMatrix.needsUpdate = true



    // console.log(ref.current.setMatrixAt(event.instanceId, temp.matrix))
    // console.log(event)
// const myObject = ref.current.getMatrixAt(event.instanceId, matrix)
    // myObject.set(intersection.x, intersection.y + 20, intersection.z)
  }

  useFrame((state) => {
    const { position } = ref.current
    zOffset += speed
    speed *= 0.90
    const newZPosition = position.z + speed
    position.set(position.x, position.y, newZPosition)
  })

  // useEffect()



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

      {/*<TeamLogo />*/}
    </>
  )
}

export default Pitches;