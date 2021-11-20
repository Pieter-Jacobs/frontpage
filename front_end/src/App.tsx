import React from 'react';
import logo from './logo.svg';
import { useEthers } from '@usedapp/core'
import Header from './Components/Header';
import './App.css';

function App() {
  // const {account} = useEthers()
  //const isConnected = account !== undefined
  return (
    <div className="App">
      Hello from App!
      <Header isConnected={true} />
    </div>
  );
}

export default App;
