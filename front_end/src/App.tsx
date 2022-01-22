import React, { useState, useEffect, memo } from "react";
import logo from "./logo.svg";
import { useEthers, ChainId, DAppProvider } from "@usedapp/core";
import Header from "./Components/Header";
import { Button } from "@mui/material";
import "./App.css";
import { TabContext, TabPanel } from "@mui/lab";
import Frontpage from "./Components/Frontpage";
import Editorial from "./Components/Editorial";
import WritingCorner from "./Components/WritingCorner";
import { Tabs } from "./enums";

const tabToComponent: { [key in Tabs]: JSX.Element } = {
  [Tabs.Frontpage]: <Frontpage />,
  [Tabs.Editorial]: <Editorial />,
  [Tabs.WritingCorner]: <WritingCorner />,
};

function App() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Frontpage);
  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.Kovan, ChainId.Mumbai],
      }}
    >
      <div className="App">
        <TabContext value={selectedTab}>
          <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {Object.values(Tabs).map((tab) => (
            <TabPanel value={tab}>{tabToComponent[tab]}</TabPanel>
          ))}
        </TabContext>
      </div>
    </DAppProvider>
  );
}

export default App;
