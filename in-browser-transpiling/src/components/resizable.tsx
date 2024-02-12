import "./resizable.css";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  return (
    // Note: width="100%" doesn't work for ResizableBox so we are using Infinity
    <ResizableBox resizeHandles={["s"]} width={Infinity} height={300}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
