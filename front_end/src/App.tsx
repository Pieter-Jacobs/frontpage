import React, { useState } from "react";
import { useEthers, ChainId, DAppProvider } from "@usedapp/core";
import Header from "./components/Header";
import "./App.css";
import { TabContext, TabPanel } from "@mui/lab";
import Frontpage from "./components/Frontpage";
import Editorial from "./components/Editorial";
import WritingCorner from "./components/WritingCorner";
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
