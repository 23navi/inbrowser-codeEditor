import { useState } from "react";
function App() {
  const [input, setInput] = useState(""); // Code which user will type into the textbox
  const [code, setCode] = useState(""); // Transpiled Code which will be displayed after user submits the textarea

  const handleClick = () => {
    console.log(input);
    setInput("");
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
