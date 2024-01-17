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
      options={{ wordWrap: "false", minimap: { enabled: false } }}
    />
  );
};

export default CodeEditor;
