import MonacoEditor from "@monaco-editor/react";

interface Props {
  initialValue: string;
}

const CodeEditor = ({ initialValue }: Props) => {
  return (
    <MonacoEditor
      height="300px" // Default the editor will be of 0 height
      language="javascript" // To give syntax highlighting and auto complete
      theme="dark" // dark | light (default)
      value={initialValue} //This is called value but it is only initial value.
      options={{
        wordWrap: "on", // This will prevent code to overflow.
        minimap: { enabled: false }, // Disable the small code preview on top right corner.
        showUnused: false, // Disable unused code highlight.
        folding: false, // Remove extra white space on left hand side before line number
        lineNumbersMinChars: 3, // Reduce the gap between line number and start of code for that line
        fontSize: 16, // Change the font size of editor
        scrollBeyondLastLine: false, // This will prevent the editor from scrolling beyond last line.
      }}
    />
  );
};

export default CodeEditor;
