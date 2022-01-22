import { MutableRefObject, useState } from "react";
import {
  faItalic,
  faBold,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { setEditorState } from "../store/Editorial";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

interface Props {
  editor: MutableRefObject<any>
}
export default function FormattingOptions(props: Props) {
  const editorState = useSelector(
    (state: RootStateOrAny) => state.editorial.editorState
  );
  const dispatch = useDispatch();

  const buttonClasses = ["BOLD", "ITALIC", "UNDERLINE"];
  const icons = [faBold, faItalic, faUnderline];
  const selectedStyles = editorState.getCurrentInlineStyle().toArray();

  const handleSelect = (e: any) => {
    // prevent blur of editor when clicking button
    e.preventDefault();
    const buttonClassName: string =
      e.currentTarget.parentElement.parentElement.className
        .split(" ")[0]
        .toLowerCase();
    dispatch(setEditorState(editorState, buttonClassName));
  };

  return (
    <div className="style-button-container">
      {buttonClasses.map((buttonClass, idx) => (
        <div className={buttonClass + " style-button"}>
          <ToggleButtonGroup>
            <ToggleButton
              selected={selectedStyles.includes(buttonClass)}
              onMouseDown={handleSelect}
              value="check"
            >
              <FontAwesomeIcon icon={icons[idx]} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ))}
    </div>
  );
}
