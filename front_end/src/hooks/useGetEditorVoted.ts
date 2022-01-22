import useContractCallWrapper from "./wrappers/useContractCallWrapper";

export default function useGetEditorVoted(editorAddress: string) {
  const editorVoted = useContractCallWrapper("getEditorVoted", [editorAddress]);
  return editorVoted[0];
}
