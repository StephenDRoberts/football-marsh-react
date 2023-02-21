import React from 'react';
import { Html } from '@react-three/drei';

const TeamLogos = ({ fixtureId, teamName, badge, position }) => {

  if(!badge) return null
  return (
    <sprite
      scale={[12,12,12]}
      position={position}
    >
      <spriteMaterial map={badge}/>
    </sprite>
  )
}

// <mesh position={position}>
//    <planeGeometry args={[20,20]}/>
//    <meshStandardMaterial map={badge}/>
//  </mesh>

export default TeamLogos;