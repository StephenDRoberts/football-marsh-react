import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './components/Box';
import './index.css';

const App = () => {
  return (
    <Canvas>
      <Box />
    </Canvas>
  )
}

export default hot(App);