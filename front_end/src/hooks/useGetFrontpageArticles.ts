import useContractCallWrapper from "./wrappers/useContractCallWrapper";
import { utils } from "ethers";

export default function useGetFrontpageArticles() {
  let frontPageArticles = useContractCallWrapper("getFrontpageArticles", []);
  if (frontPageArticles[0]) {
    frontPageArticles = frontPageArticles.map((x) =>
      x.map((y: any) => {
        return [y[0], y[1], parseFloat(utils.formatEther(y[2])) * Math.pow(10, 18)];
      })
    );
  }
  return frontPageArticles[0] ? frontPageArticles[0] : [];
}
