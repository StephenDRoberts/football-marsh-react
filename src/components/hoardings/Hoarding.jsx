import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import hoardingsImage from '../../../static/assets/logos/skybet-rebrand-test.png';
import * as THREE from 'three';

const HOARDING_SIZE = 3;
const PITCH_LENGTH = 130.4;

const Hoarding = () => {
  const texture = useLoader(TextureLoader, hoardingsImage)
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1,4)

  return (
    <>
      <cylinderGeometry
        args={[ HOARDING_SIZE, HOARDING_SIZE, PITCH_LENGTH - 10, 3, 1, true]}
      />
      <meshStandardMaterial map={texture} />
      {/*<meshBasicMaterial wireframe={true} />*/}
    </>
  )
}

export default Hoarding;