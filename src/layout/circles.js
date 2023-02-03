import React, { useState } from "react";

import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";

const Circles = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [radius, setRadius] = useState(shapeProps.radius);
  console.log("shapeProps.radius", shapeProps.radius);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        ref={shapeRef}
        radius={radius}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          setRadius(node.radius() * Math.max(scaleX, scaleY));
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: node.radius() * Math.max(scaleX,scaleY),
            // set minimal value
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Circles;
// const initialRectangles = [
//   {
//     x: 100,
//     y: 100,
//     width: 100,
//     height: 100,
//     stroke: 'black',
//     strokeWidth:1,
//     id: 'rect1',
//   },

// ];

// export default function Circs(){
//   const [rectangles, setRectangles] = React.useState(initialRectangles);
//   const [selectedId, selectShape] = React.useState(null);

//   const checkDeselect = (e) => {
//     // deselect when clicked on empty area
//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       selectShape(null);
//     }
//   };

//   return (
//     <Stage
//       width={window.innerWidth}
//       height={window.innerHeight}
//       onMouseDown={checkDeselect}
//       onTouchStart={checkDeselect}
//     >
//       <Layer>
//         {rectangles.map((rect, i) => {
//           return (
//             <Circles
//               key={i}
//               shapeProps={rect}
//               isSelected={rect.id === selectedId}
//               onSelect={() => {
//                 selectShape(rect.id);
//               }}
//               onChange={(newAttrs) => {
//                 const rects = rectangles.slice();
//                 rects[i] = newAttrs;
//                 setRectangles(rects);
//               }}
//             />
//           );
//         })}
//       </Layer>
//     </Stage>
//   );
// };
