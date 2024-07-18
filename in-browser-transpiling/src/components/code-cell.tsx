import { useEffect, useState } from "react";
import bundler from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

interface CodeCellProps {
  initialCode: string;
}

function CodeCell({ initialCode }: CodeCellProps) {
  const [input, setInput] = useState(initialCode);
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await bundler(input);
      setCode(bundledCode);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialCode}
            onChange={(value) => {
              setInput(value);
            }}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
