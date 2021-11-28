import React from 'react';

const Floor = () => {
  return(
    <mesh
    rotation={[- Math.PI * 0.5, 0, 0]}>
      <boxGeometry args={[10000,10000,1]}/>
      <meshStandardMaterial color={'#193800'}/>
    </mesh>
  )
}

export default Floor;