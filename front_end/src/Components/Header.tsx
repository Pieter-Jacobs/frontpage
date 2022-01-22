import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Tab } from "@mui/material";
import { Tabs } from "../enums";

interface headerProps {
  selectedTab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
}

export default function Header(props: headerProps) {
  const { account, activateBrowserWallet } = useEthers();
  const isConnected = account !== undefined
  return (
    <div>
      <TabList onChange={(e, v) => props.setSelectedTab(v)}>
        {Object.values(Tabs).map((v) => (
          <Tab label={v} value={v} />
        ))}
      </TabList>
      <div>
        {isConnected ? (
          <h1>Connected. Account {account}:</h1>
        ) : (
          <Button onClick={() => activateBrowserWallet()}>Connect</Button>
        )} 
      </div>
    </div>
  );
}
