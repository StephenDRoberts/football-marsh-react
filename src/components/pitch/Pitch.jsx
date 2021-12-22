import React, { useEffect, useState } from 'react';
import { Sizes } from '../../utils/sizes';
import * as THREE from 'three';
import pitchImage from '../../../static/assets/pitch/pitch2.jpg'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import { Html, useTexture } from '@react-three/drei';
import TeamLogo from './TeamLogos';

const DEFAULT_PITCH_SIZE = {
    length: 130.4,
    width: 85.1,
    depth: 2
}

const { pitchSizes } = Sizes

const Pitch = () => {
  const [pitchSize, setPitchSize] = useState(DEFAULT_PITCH_SIZE)
  const props = useTexture({ map: pitchImage })

  // const image = new THREE.TextureLoader().load(pitchImage)

  useEffect(() => {
    if(pitchSizes) {
      setPitchSize(pitchSizes)
    }
  }, [pitchSizes])


  // const uniforms = {
  //   time: {value: 1.0 },
  //   uProgress: { value: 1 },
  //   uTexture: { value: image },
  // }

  return(
    <>
      <boxGeometry
        args={[
          pitchSize.width,
          pitchSize.length,
          pitchSize.depth
        ]}
        attach={"geometry"}
      />
      {/*<shaderMaterial uniforms={uniforms} fragmentShader={fragment} vertexShader={vertex} />*/}
      <meshStandardMaterial attach={"material"} {...props} />
  </>
  )
}

export default Pitch