import React, { useEffect, useState } from 'react';
import { Sizes } from '../../utils/sizes';
import { useTexture } from '@react-three/drei';
import pitchImage from '../../../static/assets/pitch/pitch2.jpg'

const DEFAULT_PITCH_SIZE = {
    length: 130.4,
    width: 85.1,
    depth: 2
}

const { pitchSizes } = Sizes

const Pitch = () => {
  const [pitchSize, setPitchSize] = useState(DEFAULT_PITCH_SIZE)
  const props = useTexture({map: pitchImage })

  useEffect(() => {
    if(pitchSizes) {
      setPitchSize(pitchSizes)
    }
  }, [pitchSizes])

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
      <meshStandardMaterial attach={"material"} {...props} />
  </>
  )
}

export default Pitch