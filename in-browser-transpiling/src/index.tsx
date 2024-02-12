import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import CodeCell from "./components/code-cell";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  return (
    <div>
      <CodeCell initialCode="const a=10;"></CodeCell>
    </div>
  );
};
root.render(<App />);
