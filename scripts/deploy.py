from brownie import Editorial, accounts, config, network

def deploy_editorial():
    account = None
    if network.show_active() == 'kovan':
        account = accounts.add(config['wallets']['from_key'])
    else: 
        account = accounts[0]
    editorial = Editorial.deploy({"from": account}, publish_source=False)
    return editorial

def main():
    deploy_editorial()