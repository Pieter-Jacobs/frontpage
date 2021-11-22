import React, {useState} from "react";
import logo from "./logo.svg";
import { useEthers, ChainId, DAppProvider } from "@usedapp/core";
import Header from "./Components/Header";
import { Button } from "@mui/material";
import "./App.css";
import { TabContext, TabPanel } from "@mui/lab";
import Frontpage from "./Components/Frontpage";
import Editorial from "./Components/Editorial";
import WritingCorner from "./Components/WritingCorner";
import {Tabs} from './enums';

const tabToComponent: { [key in Tabs]: JSX.Element } = {
  [Tabs.Frontpage]: <Frontpage />,
  [Tabs.Editorial]: <Editorial />,
  [Tabs.WritingCorner]: <WritingCorner />,
};

function App() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Frontpage);
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
        <TabContext value={selectedTab}>
          <Header isConnected={isConnected} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
          {Object.values(Tabs).map((v) => (
            <TabPanel value={v}>{tabToComponent[selectedTab]}</TabPanel>
          ))}
        </TabContext>
      </div>
    </DAppProvider>
  );
}

export default App;
