import MonacoEditor from "@monaco-editor/react";
import type { EditorDidMount } from "@monaco-editor/react";
interface ICodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange }: ICodeEditorProps) => {
  const onEditorDidMount: EditorDidMount = (
    getValue, // a function which returns the value in the code editor. Signature of the function is () => string,
    monacoEditor // a reference to the code editor. Type editor.IStandaloneCodeEditor
  ): void => {
    // This is the event listener which we are adding to our editor which on content change will call our onChange() with getValue(). getValue() returns the current data in the code editor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
      // console.log(getValue());
    });
  };
  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount} // Will run when code editor is first mounted into the DOM
      height="300px" // Default the editor will be of 0 height
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
  );
};

export default CodeEditor;
