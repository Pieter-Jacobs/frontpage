import useContractFunctionWrapper from "./wrappers/useContractFunctionWrapper";

export default function usePinArticleToFrontpage() {
    const {send} = useContractFunctionWrapper("pinArticleToFrontPage", "Pinned article to Frontpage")
    const pinToFrontpage = () => {
      send()
    }
    return pinToFrontpage
}
