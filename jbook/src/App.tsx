import { useState } from "react";
function App() {
  const [input,setInput] = useState("") // Code which user will type into the textbox
  return (
    <div>
      <textarea></textarea>
      <div>
        <button>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
