import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const serviceRef = useRef<any>();
  const iframeRef = useRef<any>();
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

  const html = `
      <html>
      <head> </head>
      <body>
        <div id="root">
          <script>
            window.addEventListener(
              "message",
              (event) => {
                try {
                  eval(event.data);
                } catch (error) {
                  const root = document.querySelector("#root");
                  root.innerHTML =
                    '<div style="color:red;"><h4>Runtime error</h4>' +
                    error +
                    "</div>";
                  console.error(error);
                }
              },
              false
            );
          </script>
        </div>
      </body>
    </html>
  `;

  const onClick = async () => {
    if (!serviceRef.current) return; // This will be used on client browser, when conver it clicked. There can be a chance that startService is not ready yet.
    // transform in ESBuild world is transpiling (Transpiling is what bable does)
    // const result = await serviceRef.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });
    const buildResult = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });
    iframeRef.current.contentWindow.postMessage(
      buildResult.outputFiles[0].text,
      "*"
    );
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a =10; console.log(a);"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={() => onClick()}>Convert to code</button>
      <div></div>
      <iframe
        title="test"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      />
    </div>
  );
};
root.render(<App />);
