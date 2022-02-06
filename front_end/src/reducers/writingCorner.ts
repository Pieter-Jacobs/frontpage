import {
  EditorState,
  RichUtils,
} from "draft-js";

const defaultState = {
  editorState: EditorState.createEmpty(),
};

export function writingCorner(state: any = defaultState, action: any) {
  switch (action.type) {
    case "SET_EDITOR_STATE":
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
