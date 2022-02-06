import os
import shutil

path = os.getcwd()
shutil.copyfile(path + "./build/deployments/map.json", "./front_end/src/chain_info/map.json")
shutil.copyfile(path + "./build/contracts/Journal.json", "./front_end/src/chain_info/Journal.json")