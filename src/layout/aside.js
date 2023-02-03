import React, { useEffect, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import Shapes from "./rectangle";

const Aside = ({ shapeUpdate }) => {
  const [update, setUpdate] = useState(shapeUpdate);
  const [cric, setCirc] = useState(shapeUpdate);
  const [tri, setTri] = useState(shapeUpdate);
  let [duplicateShape,setDuplicateShape]=useState([])
  

  return (
    <>
      <div
        style={{ backgroundColor: "#efefef", width: "60vh", height: "100vh" }}
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            border: "1px solid black",
            margin: "40px",
          }}
          onClick={() => {
            setUpdate(true);
          }}
        ></div>
        <div
          style={{
            height: "50px",
            width: "50px",
            border: "1px solid black",
            borderRadius: "50%",
            margin: "40px",
          }}
          onClick={() => {
            setCirc(true);
          }}
        ></div>
        <div
          className="container"
          onClick={() => {
            setTri(true);
          }}
        ></div>
      </div>
      <Shapes setShapeUpdate={update} setCircleUpdate={cric} setTri={tri} />
    </>
  );
};

export default Aside;
