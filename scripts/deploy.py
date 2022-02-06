from brownie import Journal, accounts, config, network

def deploy_journal():
    account = None
    if network.show_active() == 'kovan' or network.show_active() ==  'mumbai':
        account = accounts.add(config['wallets']['from_key'])
    else: 
        account = accounts[0]
    journal = Journal.deploy(5, 5, {"from": account}, publish_source=False)
    return journal

def main():
    deploy_journal()