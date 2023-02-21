import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Sizes } from './utils/sizes';
import Marsh from './views/Marsh';
import SingleGame from './views/SingleGame';
import './index.css';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8001');

const App = () => {
  const location = useLocation()

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
  },[])

  useEffect(() => {
    client.onmessage = (message) => {
      console.log(message);
    };
  },[])

  if(!Sizes) return;
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
          <Route path={"/"} element={<Marsh />} />
          <Route path={"/fixtureId"} element={<SingleGame />}/>
      </Routes>
    </AnimatePresence>
  )
}

export default hot(App);