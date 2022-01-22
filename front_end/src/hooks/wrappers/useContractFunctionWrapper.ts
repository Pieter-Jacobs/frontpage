import { useEthers, useContractFunction } from "@usedapp/core";
import { utils, constants } from "ethers";
import { Contract } from "@ethersproject/contracts";
import networkMapping from "../../chain_info/map.json";
import Editorial from "../../chain_info/Editorial.json";

export default function useContractFunctionWrapper(methodName: string, transactionName: string) {
  const { chainId } = useEthers()
  const { abi } = Editorial;
  const contractAddress = chainId ? networkMapping[String(chainId)]["Editorial"][0]
    : constants.AddressZero;
  const contractInterface = new utils.Interface(abi);
  const contract = new Contract(contractAddress, contractInterface);
  return useContractFunction(contract, methodName, {
    transactionName: transactionName,
  });
}
