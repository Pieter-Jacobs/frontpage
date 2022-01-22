import useContractFunctionWrapper from "./wrappers/useContractFunctionWrapper";

export default function useInitArticle() {
  const { send } = useContractFunctionWrapper(
    "initArticle",
    "Uploaded new Article"
  );
  const initArticle = (text: string) => {
    send(text);
  };
  return initArticle;
}
