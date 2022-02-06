import useContractFunctionWrapper from "./wrappers/useContractFunctionWrapper";

export default function useUpvoteArticles() {
  const { send } = useContractFunctionWrapper(
    "upvoteArticles",
    "Upvoted Articles"
  );
  
  const upvoteArticles = (vote: number) => {
    send(vote);
  };
  return upvoteArticles;
}
