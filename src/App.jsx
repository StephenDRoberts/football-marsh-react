import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Sizes } from './utils/sizes';
import Marsh from './views/Marsh';
import SingleGame from './views/SingleGame';
import './index.css';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation()
  if(!Sizes) return;
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
          <Route path={"/"} element={<Marsh />} />
          <Route path={"/fixtureId"} element={<SingleGame />}/>
      </Routes>
    </AnimatePresence>
  )
}

export default hot(App);