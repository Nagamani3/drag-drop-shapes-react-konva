import React, { useEffect, useState } from "react";

import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";
import Aside from "./aside";
import Circles from "./circles";
import ResizableArrow from "./resizeableArrow";
import Traingle from "./traingle";

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  setShapeUpdate,
  onClick
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  let [data, setData] = useState(null);

  React.useEffect(
    (e) => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    },
    [isSelected]
  );

  React.useEffect(() => {
    setData(setShapeUpdate);
    console.log("uwhwhuwhuw", data);
  }, []);
  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
     
        onTap={onSelect}
        ref={shapeRef}
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
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected ? (
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
      ) : null}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    type: "rectangle",
    x: 30,
    y: 50,
    width: 60,
    height: 60,
    stroke: "black",
    id: "rect1",
    strokeWidth: 1,
    strokeScaleEnabled: false,
  },
];
const initialCircles = [
  {
    x: 140,
    y: 80,
    radius: 4,
    width: 60,
    height: 60,
    stroke: "black",
    id: "rect2",
    strokeWidth: 1,
    strokeScaleEnabled: false,
  },
];
const initialTriangles = [
  {
    x: 180,
    y: 60,
    width: 60,
    height: 60,
    stroke: "black",
    id: "rect3",
    strokeWidth: 1,
    strokeScaleEnabled: false,
  },
];

export default function Shapes({ setShapeUpdate, setCircleUpdate, setTri }) {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [circles, setCircles] = React.useState(initialCircles);
  const [triangles, setTriangles] = React.useState(initialTriangles);
  const [selectedId, selectShape] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [circle, setCircle] = React.useState(null);
  const [traing, setTriang] = React.useState(null);
  let [shapes,setShapes]=useState([])

  const checkDeselect = (e) => {
    
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && selectedId !== rectangles.id) {
      selectShape(null);
    }
  };
  useEffect(() => {
    setData(setShapeUpdate);
    if(data){
      setData(setShapeUpdate)
    }
  });
  useEffect(() => {
    setCircle(setCircleUpdate);
  });
  useEffect(() => {
    setTriang(setTri);
  });

  const handleClick = ()=>{
setShapes([
  ...shapes,
  {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  },
])
console.log("shapes",shapes)
  }
  console.log("dhape update", data);
  return (
    <>
      <Stage
        width={window.innerWidth - 150}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        fill="#ffc107"
        style={{
          border: "1px solid black",
      
        }}
      >
        {data ? (
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  setShapeUpdate={data}
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                    console.log("rectangle only clicked");
                    setData(true)
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    console.log("rect", rect);
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                  onClick={handleClick}
                />
              );
            })}
          </Layer>
        ) : null}
        {circle  ? (
          <Layer>
            {circles.map((circ, i) => {
              return (
                <Circles
                  key={i}
                  shapeProps={circ}
                  isSelected={circ.id === selectedId}
                  onSelect={() => {
                    selectShape(circ.id);
                  }}
                  onChange={(newAttrs) => {
                    const cir = circles.slice();
                    cir[i] = newAttrs;
                    setCircles(cir);
                  }}
                />
              );
            })}
          </Layer>
        ) : null}
        {traing === true ? (
          <Layer>
            {triangles.map((tri, i) => {
              return (
                <Traingle
                  key={i}
                  shapeProps={tri}
                  isSelected={tri.id === selectedId}
                  onSelect={() => {
                    selectShape(tri.id);
                  }}
                  onChange={(newAttrs) => {
                    const angle = triangles.slice();
                    angle[i] = newAttrs;
                    setTriangles(angle);
                  }}
                />
              );
            })}
          </Layer>
        ) : null}
      </Stage>
    </>
  );
}
