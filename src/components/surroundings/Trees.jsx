import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import treeModel from '../../../static/assets/models/tree2.gltf'
import { useFrame } from '@react-three/fiber';

const treeScale = [5,5,5]

const Trees = ({ count= 1000, temp = new THREE.Object3D, matrix = new THREE.Matrix4() }) => {
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const { nodes, materials } = useGLTF(treeModel);
  let zOffset = 0
  let speed = 0

  const trunkGeometry = (nodes.LowPoly_Tree_026).children[0].geometry
  const leavesGeometry = (nodes.LowPoly_Tree_026).children[1].geometry
  const darkerLeavesGeometry = (nodes.LowPoly_Tree_026).children[2].geometry

  const trunkMaterial = (nodes.LowPoly_Tree_026).children[0].material
  const leavesMaterial = (nodes.LowPoly_Tree_026).children[1].material
  const darkerLeavesMaterial = (nodes.LowPoly_Tree_026).children[2].material
  //
  useEffect(() => {
    for(let i = 0; i< count; i++) {
      const randomX = Math.random() - 0.5
      const randomY = Math.random()
      const x =
        randomX < 0 ?  -45 + randomX * 90 * 2 : 45 + randomX * 90 * 2
      const y =
         - randomY * 130.4 / 5 * 2 * 10 + 45


      temp.position.set(
        x,
        y,
        -3.6
      )
      temp.updateMatrix()
      const id = i
      ref1.current.setMatrixAt(id, temp.matrix)
      ref2.current.setMatrixAt(id, temp.matrix)
      ref3.current.setMatrixAt(id, temp.matrix)
    }
    ref1.current.instanceMatrix.needsUpdate = true
    ref2.current.instanceMatrix.needsUpdate = true
    ref3.current.instanceMatrix.needsUpdate = true
  },[])


  const handleWheelEvent = (event) => {
    event.preventDefault
    speed += event.deltaY * 0.05
  }

  useFrame((state) => {
    const { position: position1 } = ref1.current
    const { position: position2 } = ref2.current
    const { position: position3 } = ref3.current
    zOffset += speed
    speed *= 0.90
    const newZPosition1 = position1.z + speed
    const newZPosition2 = position2.z + speed
    const newZPosition3 = position3.z + speed
    position1.set(position1.x, position1.y, newZPosition1)
    position2.set(position2.x, position2.y, newZPosition2)
    position3.set(position3.x, position3.y, newZPosition3)
  })




  if(!(nodes && materials)) return null
  return (
    <>
      <instancedMesh
        ref={ref1}
        args={[trunkGeometry, trunkMaterial, count]}
        onWheel={handleWheelEvent}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
      <instancedMesh
        ref={ref2}
        args={[leavesGeometry, leavesMaterial, count]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
      <instancedMesh
        ref={ref3}
        args={[darkerLeavesGeometry, darkerLeavesMaterial, count]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
    </>
  )
}

export default Trees;