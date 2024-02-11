import { useState } from "react";
import bundler from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

interface CodeCellProps {
  initialCode: string;
}

function CodeCell({ initialCode }: CodeCellProps) {
  const [input, setInput] = useState(initialCode);
  const [code, setCode] = useState("");

  const onClick = async () => {
    const bundledCode = await bundler(input);
    setCode(bundledCode);
  };

  return (
    <div>
      <CodeEditor
        initialValue={initialCode}
        onChange={(value) => {
          setInput(value);
        }}
      />
      <button onClick={() => onClick()}>Convert to code</button>
      <div></div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
