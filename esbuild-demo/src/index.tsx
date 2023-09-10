import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const serviceRef = useRef<any>();
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    startService();
  }, []);
  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm", // we have it in public folder
    });
  };

  const onClick = async () => {
    if (!serviceRef.current) return;
    const result = await serviceRef.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    setCode(result.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={() => onClick()}>Convert to code</button>
      <div>
        <pre>{code}</pre>
      </div>
    </div>
  );
};
root.render(<App />);
