import React from "react";
import logo from "./logo.svg";
import { useEthers, ChainId, DAppProvider } from "@usedapp/core";
import Header from "./Components/Header";
import {Button} from '@mui/material';
import "./App.css";

function App() {
  const { account } = useEthers();
  const isConnected = account !== undefined;
  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.Kovan],
      }}
    >
      <div className="App">
        Hello from app!
        <Header isConnected={isConnected}/>
      </div>
    </DAppProvider>
  );
}

export default App;
