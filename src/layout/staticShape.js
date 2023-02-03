import React, { useState } from "react";
import { Image, Rect } from "react-konva";

const StaticShape = ({ shapeProps }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Image
      {...shapeProps}
      onClick={() => {
        setSelected(true);
      }}
    />
  );
};

export default StaticShape;
