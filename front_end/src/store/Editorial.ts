import { accordionActionsClasses } from "@mui/material";
import { AnyPtrRecord } from "dns";
import {EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { RootStateOrAny } from "react-redux";
import { combineReducers } from "redux";

const SET_EDITOR_STATE = "SET_EDITOR_STATE";

export function setEditorState(editorState: EditorState, command?: any) {
  return {
    type: SET_EDITOR_STATE,
    payload: {
      command: command,
      editorState: editorState,
    },
  };
}

const editorState = EditorState.createEmpty();

const defaultState = {
  editorState: editorState,
};

function editorial(state: any = defaultState, action: any) {
  switch (action.type) {
    case SET_EDITOR_STATE:
      if (action.payload.command) {
        const newState = RichUtils.handleKeyCommand(
          action.payload.editorState,
          action.payload.command
        );
        if (newState) {
          return {
            ...state,
            editorState: newState,
          };
        }
      }
      return {
        ...state,
        editorState: action.payload.editorState,
      };
    default:
      return state;
  }
}
const editorialApp = combineReducers({
  editorial,
});

export default editorialApp;
