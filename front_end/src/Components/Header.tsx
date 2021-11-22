import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Tab } from "@mui/material";
import Frontpage from './Frontpage';
import Editorial from './Editorial';
import WritingCorner from './WritingCorner';

interface headerProps {
  isConnected: boolean;
}

enum Tabs {
  Frontpage = "Frontpage",
  Editorial = "Editorial",
  WritingCorner = "Writing Corner"
}

const tabToComponent: {[key in Tabs] : JSX.Element}= {
  [Tabs.Frontpage]: <Frontpage/>,
  [Tabs.Editorial]: <Editorial/>,
  [Tabs.WritingCorner]: <WritingCorner/>
}  

export default function Header(props: headerProps) {
  const { account, activateBrowserWallet } = useEthers();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Frontpage);

  return (
    <div>
      <TabContext value={selectedTab}>
        <TabList onChange={(e, v) => setSelectedTab(v)}>
          {Object.values(Tabs).map((v) => (
            <Tab label={v} value={v} />
          ))}
        </TabList>
        {Object.values(Tabs).map((v) => (
            <TabPanel value={v}>{tabToComponent[selectedTab]}</TabPanel>
          ))}
      </TabContext>
      <div>
        {props.isConnected ? (
          <h1>Connected. Account {account}:</h1>
        ) : (
          <Button onClick={() => activateBrowserWallet()}>Connect</Button>
        )}
      </div>
    </div>
  );
}
