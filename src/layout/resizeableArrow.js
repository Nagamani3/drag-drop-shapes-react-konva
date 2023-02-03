import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

function ResizeableArrow() {
  const [start, setStart] = useState({ x: 100, y: 100 });
  const [end, setEnd] = useState({ x: 200, y: 200 });

  const handleStartDrag = e => {
    setStart({ x: e.target.x(), y: e.target.y() });
  };

  const handleEndDrag = e => {
    setEnd({ x: e.target.x(), y: e.target.y() });
  };

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Line
          points={[start.x, start.y, end.x, end.y]}
          stroke="black"
          draggable
          onDragEnd={handleStartDrag}
        />
        <Line
          points={[end.x - 10, end.y - 10, end.x, end.y, end.x + 10, end.y - 10]}
          fill="black"
          draggable
          onDragEnd={handleEndDrag}
        />
      </Layer>
    </Stage>
  );
}

export default ResizeableArrow;
