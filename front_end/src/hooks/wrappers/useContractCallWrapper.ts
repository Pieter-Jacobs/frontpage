import { useContractCall, useEthers } from "@usedapp/core";
import { utils, constants } from "ethers";
import networkMapping from "../../chain_info/map.json";
import Editorial from "../../chain_info/Editorial.json";

export default function useContractCallWrapper(methodName: string, args: Array<any>) {
  const { chainId } = useEthers();
  const { abi } = Editorial;
  const contractAddress = chainId
    ? networkMapping[String(chainId)]["Editorial"][0]
    : constants.AddressZero;
  const contractInterface = new utils.Interface(abi);
  const value =
    useContractCall(
      contractInterface &&
        contractAddress && {
          abi: contractInterface,
          address: contractAddress,
          method: methodName,
          args: args,
        }
    ) ?? [];
  return value
}
