from brownie import Editorial, accounts, config

def deploy_editorial():
    editorial = Editorial.deploy({"from": accounts[0]})
    return editorial

def main():
    deploy_editorial()