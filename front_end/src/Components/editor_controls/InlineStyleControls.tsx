import StyleButton from "./StyleButton";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

export default function InlineStyleControls({ onToggle }: any) {
    const editorState = useSelector(
        (state: RootStateOrAny) => state.writingCorner.editorState
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
        { label: "Monospace", style: "CODE" },
    ];
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle} 
            style={type.style}
          />
        ))}
      </div>
    );
  }
  