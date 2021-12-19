import React from 'react';
import evertonLogo from '../../../static/assets/logos/everton-logo.png'
import arsenalLogo from '../../../static/assets/logos/arsenal-logo.png'
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const TeamLogo = ({ teamName, x, y, z }) => {

  // const logo = useLoader(TextureLoader, evertonLogo)
  // logo.scale.set(10, 10, 10)
  // logo.position.set(x, y, z)
console.log(teamName)
  return (
    <instancedMesh
      args={[null, null, 100]}
    >
      <planeGeometry args={[10,10]}/>
      <meshBasicMaterial wireframe={true}/>
    </instancedMesh>
  )
}

export default TeamLogo;