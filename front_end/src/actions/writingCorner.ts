import {
    EditorState,
  } from "draft-js";

export function setEditorState(editorState: EditorState, command?: any) {
    return {
      type: "SET_EDITOR_STATE",
      payload: {
        command: command,
        editorState: editorState,
      },
    };
  }