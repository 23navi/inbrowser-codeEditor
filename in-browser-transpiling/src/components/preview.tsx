// This component will house the iframe which will display the output of user's code

import "./preview.css";
import { useEffect, useRef } from "react";

const html = `
<html style="width: 100%; height: 100%">
  <head> </head>
  <body>
    <div id="root">
      <script>
        const handleError = (error) => {
          const root = document.querySelector("#root");
          root.innerHTML =
            '<div style="color:red;"><h4>Runtime error</h4>' + error + "</div>";
          console.error(error);
        };

        window.addEventListener("error", (event) => {
          handleError(event.error);
        });

        window.addEventListener(
          "message",
          (event) => {
            try {
              eval(event.data);
            } catch (error) {
              handleError(error);
            }
          },
          false
        );
      </script>
    </div>
  </body>
</html>
`;

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;

    // This is to give iframe time to setup message listener inside the iframe
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className={"iframe-wrapper"}>
      <iframe
        // style={{ backgroundColor: "white" }}
        title="test"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      />
    </div>
  );
};

export default Preview;
