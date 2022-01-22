import React, { useEffect, useRef } from "react";
import { Button, TextField } from "@mui/material";
import useInitArticle from "../hooks/useInitArticle";
import { Editor, EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import FormattingOptions from "./FormattingOptions";
import "draft-js/dist/Draft.css";
import { setEditorState } from "../store/Editorial";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

export default function WritingCorner() {
  const editor = useRef<any>(null);
  const dispatch = useDispatch();
  const editorState = useSelector(
    (state: RootStateOrAny) => state.editorial.editorState
  );
  const initArticle = useInitArticle();

  useEffect(() => {
    // prevent weird bug where style selection doesnt work before focus
    editor.current.focus()
  }, [])

  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const oldState = editorState;
    dispatch(setEditorState(editorState, command));
    if (oldState !== editorState) {
      return "handled";
    }
    return "not-handled";
  };

  const handleChange = (newState: EditorState) => {
    dispatch(setEditorState(newState, ""));
  };



  const submitArticle = () => {
    initArticle(String(convertToHTML(editorState.getCurrentContent())));
  };

  return (
    <div className="writing-corner-container">
      <h1>Write your article</h1>
      <FormattingOptions editor={editor} />
      <Editor
        ref={editor}
        placeholder="Write your article here..."
        blockStyleFn={() => "text-editor"}
        editorState={editorState}
        textDirectionality={'LTR'}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
      />
      <Button onClick={submitArticle}>Submit Article</Button>
    </div>
  );
}
