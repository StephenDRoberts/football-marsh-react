import React, { useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import hoardingsImage from '../../../static/assets/logos/skybet-rebrand-test.png';
// import hoardingsImage from '../../../static/assets/logos/Sky_Bet_SECONDARY_RGB_flipped-test.png';
import { generateHoardingCoordinates } from '../../utils/coordinates';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const HOARDING_SIZE = 3;
const PITCH_LENGTH = 130.4;

const Hoardings = ({ pitchSize, count = 100, temp = new THREE.Object3D()}) => {
  const ref = useRef()
  const texture = useLoader(TextureLoader, hoardingsImage)
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1,4)

  const sizesWithHoardings = {...pitchSize, hoardingsSize: HOARDING_SIZE }

  const handleOnHoardingsClick = () => {
    window.open('https://m.skybet.com/', '_blank').focus();
  }

  const handlePointerLeave = () => {
    document.body.style.cursor = 'auto'
  }

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer'
  }

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const column = i % 5
      const row = Math.trunc(i / 5)

      if(column === 0 || column === 4) {
        const columnToSet = column === 0 ? 0 : 5
        const coordinates = generateHoardingCoordinates(sizesWithHoardings, row, columnToSet)

        // I have no idea why Z needs to be in Y and why it has to be negative
        // but otherwise it doesn't work :(
        temp.position.set(
          coordinates.hoardings.x,
          -coordinates.hoardings.z,
          coordinates.hoardings.y,
        )
        temp.updateMatrix()
        const id = i
        ref.current.setMatrixAt(id, temp.matrix)
      }
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true

  },[])

  return(
    <instancedMesh
      ref={ref}
      args={[null, null, count]}
      onClick={handleOnHoardingsClick}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
    >
      <cylinderGeometry
        args={[ HOARDING_SIZE, HOARDING_SIZE, PITCH_LENGTH - 10, 3, 1, true]}
      />
      <meshStandardMaterial map={texture} />
      {/*<meshBasicMaterial wireframe={true} />*/}
    </instancedMesh>
  )
}
export default Hoardings;