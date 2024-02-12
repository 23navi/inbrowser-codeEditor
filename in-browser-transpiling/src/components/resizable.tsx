import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "vertical") {
    resizableProps = {
      // Note: width="100%" doesn't work for ResizableBox so we are using Infinity
      width: Infinity, // default starting height. Will change when we drag it
      height: 300,
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 50], // 50px
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      width: window.innerWidth * 0.75,
      height: Infinity,
      minConstraints: [window.innerHeight * 0.2, Infinity],
      // maxConstraints: [window.innerHeight * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
