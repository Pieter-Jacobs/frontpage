import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Tab } from "@mui/material";
import Frontpage from './Frontpage';
import Editorial from './Editorial';
import WritingCorner from './WritingCorner';
import {Tabs} from '../enums';

interface headerProps {
  isConnected: boolean;
  selectedTab: Tabs;
  setSelectedTab: ((tab: Tabs) => void); 
}


export default function Header(props: headerProps) {
  const { account, activateBrowserWallet } = useEthers();

  return (
    <div>
        <TabList onChange={(e, v) => props.setSelectedTab(v)}>
          {Object.values(Tabs).map((v) => (
            <Tab label={v} value={v} />
          ))}
        </TabList>
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
