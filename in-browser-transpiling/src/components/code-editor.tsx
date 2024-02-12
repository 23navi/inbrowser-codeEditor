import "./code-editor.css";
import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
// import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import type { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
interface ICodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange }: ICodeEditorProps) => {
  const editorRef = useRef<any>(null); // Ref for editor

  const onEditorDidMount: EditorDidMount = (
    getValue, // a function which returns the value in the code editor. Signature of the function is () => string,
    monacoEditor // a reference to the code editor. Type editor.IStandaloneCodeEditor
  ): void => {
    editorRef.current = monacoEditor; // Setting the ref for monacoEditor to be used in other part of code.

    // This is the event listener which we are adding to our editor which on content change will call our onChange() with getValue(). getValue() returns the current data in the code editor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
      // console.log(getValue());
    });

    // Making the tab take 2 space insted of default 4
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 }); // directly updating options on the editor.
  };

  const onFormatClick = () => {
    // Get the unformated code from the editor
    const unformatedCode = editorRef.current.getModel()?.getValue();

    // format the code using prettier
    const formatedCode = prettier.format(unformatedCode, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      singleQuote: true,
      semi: true,
    });

    // set the codeEditor code to formated code
    editorRef.current.setValue(formatedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount} // Will run when code editor is first mounted into the DOM
        height="100%" // Default the editor will be of 0 height
        language="javascript" // To give syntax highlighting and auto complete
        theme="dark" // dark | light (default)
        value={initialValue} //This is called value but it is only initial value.
        // This is directly setting the monaco editor.
        options={{
          wordWrap: "on", // This will prevent code to overflow.
          minimap: { enabled: false }, // Disable the small code preview on top right corner.
          showUnused: false, // Disable unused code highlight.
          folding: false, // Remove extra white space on left hand side before line number
          lineNumbersMinChars: 3, // Reduce the gap between line number and start of code for that line
          fontSize: 16, // Change the font size of editor
          scrollBeyondLastLine: false, // This will prevent the editor from scrolling beyond last line.
          automaticLayout: true, // This will automatically adjust the width of the editor on resizing of window
        }}
      />
    </div>
  );
};

export default CodeEditor;
