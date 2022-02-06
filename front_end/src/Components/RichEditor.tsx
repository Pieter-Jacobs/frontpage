import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import useInitArticle from "../hooks/useInitArticle";
import { convertToHTML } from "draft-convert";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setEditorState } from "../actions/writingCorner";
import InlineStyleControls from "./editor_controls/InlineStyleControls";
import BlockStyleControls from "./editor_controls/BlockStyleControls";
import "draft-js/dist/Draft.css";

function RichEditor() {
  const editorState = useSelector(
    (state: RootStateOrAny) => state.writingCorner.editorState
  );
  
  const dispatch = useDispatch();
  const editor = useRef<any>(null);

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const handleChange = (newState: EditorState) => {
    dispatch(setEditorState(newState, ""));
  };

  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      dispatch(setEditorState(newState, command));
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e: any) => {
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== editorState) {
          dispatch(setEditorState(newEditorState));
        }
        return null;
    }
    return getDefaultKeyBinding(e);
  };

  function getBlockStyle(block: any) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "RickEditor-block";
    }
  }
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType: any) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType);
          dispatch(setEditorState(newState));
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle: any) => {
          const newState = RichUtils.toggleInlineStyle(
            editorState,
            inlineStyle
          );
          dispatch(setEditorState(newState));
        }}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          placeholder="Write your article here..."
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export default RichEditor;
