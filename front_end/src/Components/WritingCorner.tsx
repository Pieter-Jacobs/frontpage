import React from "react";
import { Button } from "@mui/material";
import useInitArticle from "../hooks/useInitArticle";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import RichEditor from "./RichEditor";

export default function WritingCorner() {
  const dispatch = useDispatch();
  const editorState = useSelector(
    (state: RootStateOrAny) => state.editorial.editorState
  );
  const initArticle = useInitArticle();

  const submitArticle = () => {
    initArticle(String(convertToHTML(editorState.getCurrentContent())));
  };

  return (
    <div className="writing-corner-container">
      <h1>Write your article</h1>
      <RichEditor />
      <Button onClick={submitArticle}>Submit Article</Button>
    </div>
  );
}
