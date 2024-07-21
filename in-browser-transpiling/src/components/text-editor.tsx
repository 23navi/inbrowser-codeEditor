import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./text-editor.css";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [mdValue, setMdValue] = useState("");

  useEffect(() => {
    const clickListner = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", clickListner, { capture: true });

    return () => {
      document.removeEventListener("click", clickListner, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor
          value={mdValue}
          onChange={(changedValue) => {
            setMdValue(changedValue || "");
          }}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={mdValue} />
      </div>
    </div>
  );
};

export default TextEditor;
