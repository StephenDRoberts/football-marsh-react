import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Instances, useGLTF } from '@react-three/drei';
import treeModel from '../../../static/assets/models/tree2.gltf'
import Tree from './Tree';

const treeScale = [5,5,5]

const Trees = ({ count= 100, temp = new THREE.Object3D, matrix = new THREE.Matrix4() }) => {
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const { nodes, materials } = useGLTF(treeModel);

  const trunkGeometry = (nodes.LowPoly_Tree_026).children[0].geometry
  const leavesGeometry = (nodes.LowPoly_Tree_026).children[1].geometry
  const darkerLeavesGeometry = (nodes.LowPoly_Tree_026).children[2].geometry

  const trunkMaterial = (nodes.LowPoly_Tree_026).children[0].material
  const leavesMaterial = (nodes.LowPoly_Tree_026).children[1].material
  const darkerLeavesMaterial = (nodes.LowPoly_Tree_026).children[2].material
  //
  useEffect(() => {
    for(let i = 0; i< count; i++) {
      temp.position.set(
        Math.random() * 100,
        Math.random() * 100,
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

  if(!(nodes && materials)) return null

  // console.log(trunkGeometry)
  return (
    <>
      <instancedMesh
        ref={ref1}
        args={[trunkGeometry, trunkMaterial, 100]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
      <instancedMesh
        ref={ref2}
        args={[leavesGeometry, leavesMaterial, 100]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
      <instancedMesh
        ref={ref3}
        args={[darkerLeavesGeometry, darkerLeavesMaterial, 100]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={treeScale}
      />
    </>
  )
}

export default Trees;