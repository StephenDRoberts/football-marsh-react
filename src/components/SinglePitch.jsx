import React from 'react';
import Pitch from './pitch/Pitch';
import Hoarding from './hoardings/Hoarding';
import { generateHoardingCoordinates } from '../utils/coordinates';

const HOARDING_SIZE = 3;

const SinglePitch = ({ pitchSize }) => {

  const sizesWithHoardings = {...pitchSize, hoardingsSize: HOARDING_SIZE }

  const { hoardings } = generateHoardingCoordinates(sizesWithHoardings, 0, 2)
  console.log(hoardings)
  if(!hoardings) return null
  return (
    <>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
        <Pitch />
      </mesh>
      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[hoardings.x, hoardings.y, hoardings.z]}
      >
        <Hoarding />
      </mesh>
    </>

)
};

export default SinglePitch;