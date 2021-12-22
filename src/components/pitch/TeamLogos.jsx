import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { generateTeamLogoCoordinates } from '../../utils/coordinates';

const TeamLogos = ({ pitchSize, count = 200, temp = new THREE.Object3D(), matrix = new THREE.Matrix4() }) => {
  const ref = useRef();

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const column = (i/2) % 5
      const row = Math.trunc((i/2) / 5)
      const home = i % 2
      const coordinates = generateTeamLogoCoordinates({pitchSize, row, column, home})

      temp.position.set(
        coordinates.teamLogo.x,
        - coordinates.teamLogo.z,
        coordinates.teamLogo.y
      )
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, count]}
      // rotation={[-Math.PI * 0.5,0,0]}
    >
      <planeGeometry args={[10,10]}/>
      <meshStandardMaterial color={'white'}/>
    </instancedMesh>
  )
}

export default TeamLogos;