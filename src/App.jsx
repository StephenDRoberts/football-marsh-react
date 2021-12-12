import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Sizes } from './utils/sizes';
import Marsh from './views/Marsh';
import SingleGame from './views/SingleGame';
import './index.css';


const App = () => {
  if(!Sizes) return;
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Marsh />} />
        <Route path={"/fixtureId"} element={<SingleGame />}/>
      </Routes>
    </HashRouter>
  )
}

export default hot(App);