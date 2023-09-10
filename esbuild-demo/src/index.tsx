import ReactDOM from "react-dom/client";
import { useState } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const onClick = () => {
    console.log("input");
    setCode(input);
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
