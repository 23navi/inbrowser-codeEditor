import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundler from "./bundler";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const [input, setInput] = useState("const a =10; console.log(a);");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const bundledCode = await bundler(input);
    setCode(bundledCode);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a =10; console.log(a);"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <button onClick={() => onClick()}>Convert to code</button>
      <div></div>
      <Preview code={code} />
    </div>
  );
};
root.render(<App />);
