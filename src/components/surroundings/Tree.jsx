import React, { useEffect, useRef } from 'react';
import { useGLTF, Merged, Instance } from '@react-three/drei';
import tree from '../../../static/assets/models/tree2.gltf'

const Tree = ({ random, ...props}) => {
  const ref = useRef()
  const { nodes, materials } = useGLTF(tree)
  const treeNode = nodes.LowPoly_Tree_026
  const treeScale = [5,5,5]
  //
  // useEffect(() => {
  //   ref.current.position.y = random
  //   // ref.current.scale = treeScale
  // },[])

if(!(nodes && materials)) return null
  return (
    // <group {...props}>
    //   <Instance ref={ref} />
    // </group>

    // <Merged meshes = {treeNode}>
    //   {(One, Two, Three ) => (
    //     <>
    //     <One
    //       position={[-232.8, 0, -20]}
    //       rotation={[-Math.PI * 0.5]}
    //       scale={treeScale}
    //     />
    //     <Two
    //       position={[-232.8, 0, -20]}
    //       rotation={[-Math.PI * 0.5]}
    //       scale={treeScale}
    //     />
    //     <Three
    //       position={[-232.8, 0, -20]}
    //       rotation={[-Math.PI * 0.5]}
    //       scale={treeScale}/>
    //     </>
    //   )}
    // </Merged>

    <group
      rotation={[Math.PI * 0.5, 0, 0]}
    >
    <mesh
      geometry={(nodes.LowPoly_Tree_026).children[0].geometry}
      material={(nodes.LowPoly_Tree_026).children[0].material}
      position={[-232.8, 0, -20]}
      scale={treeScale}
    >
    </mesh>

  <mesh
    geometry={(nodes.LowPoly_Tree_026).children[1].geometry}
    material={(nodes.LowPoly_Tree_026).children[1].material}
    position={[-232.8, 0, -20]}
    scale={treeScale}
  >
  </mesh>
  <mesh
    geometry={(nodes.LowPoly_Tree_026).children[2].geometry}
    material={(nodes.LowPoly_Tree_026).children[2].material}
    position={[-232.8, 0, -20]}
    scale={treeScale}
  >
  </mesh>
    </group>


  )
}

export default Tree;