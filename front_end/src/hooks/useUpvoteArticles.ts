import useContractFunctionWrapper from "./wrappers/useContractFunctionWrapper";

export default function useUpvoteArticles() {
  const { send } = useContractFunctionWrapper(
    "upvoteArticles",
    "Upvoted Articles"
  );
  const upvoteArticles = (votes: Array<number>) => {
    send(votes);
  };
  return upvoteArticles;
}
