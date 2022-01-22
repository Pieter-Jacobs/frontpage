import useContractCallWrapper from "./wrappers/useContractCallWrapper";

export default function useGetSubmittedArticles() {
  const [articles] = useContractCallWrapper("getSubmittedArticles", []);
  return articles ? articles : [];
}
