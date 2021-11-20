import React from 'react'
import { useEthers } from '@usedapp/core';
import {Button} from '@mui/material';

interface headerProps {
    isConnected: boolean
}

export default function Header(props: headerProps) {
    const {account, activateBrowserWallet} = useEthers()
    return (
        <div>
            Hello from header!
            {props.isConnected ? 
            <h1>Connected. Account {account}:</h1> :
            <Button onClick={() => activateBrowserWallet()}>Connect</Button>}
        </div>
    )
}
