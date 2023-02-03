import React, { useState } from "react";
import { Image, Rect } from "react-konva";

const ResizableShape = ({ shapeProps }) => {
  const [selected, setSelected] = useState(false);
  const [hi, setShapeProps] = useState([]);

  return (
    <Rect
      {...shapeProps}
      draggable
      onClick={() => {
        setSelected(true);
      }}
      onTransform={() => {
        // update size of the shape after resize
        setShapeProps({
          ...shapeProps,
          width: shapeProps.width() * shapeProps.scaleX(),
          height: shapeProps.height() * shapeProps.scaleY(),
          scaleX: 1,
          scaleY: 1,
        });
      }}
    />
  );
};

export default ResizableShape;
