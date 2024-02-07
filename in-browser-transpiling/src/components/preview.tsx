// This component will house the iframe which will display the output of user's code

import { useEffect, useRef } from "react";

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

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      title="test"
      srcDoc={html}
      sandbox="allow-scripts"
      ref={iframeRef}
    />
  );
};

export default Preview;
