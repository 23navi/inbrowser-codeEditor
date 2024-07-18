import { useEffect, useState } from "react";
import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  // const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const resizeListner = () => {
      timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer);
        }
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 1000);
    };
    window.addEventListener("resize", resizeListner);

    // Clean up function, which runs when the component is de-mount
    return () => {
      window.removeEventListener("resize", resizeListner);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;
  if (direction === "vertical") {
    resizableProps = {
      // Note: width="100%" doesn't work for ResizableBox so we are using Infinity
      width: Infinity, // default starting height. Will change when we drag it
      height: 300,
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50], // 50px
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      width,
      height: Infinity,
      minConstraints: [innerHeight * 0.2, Infinity],
      // maxConstraints: [innerHeight * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
