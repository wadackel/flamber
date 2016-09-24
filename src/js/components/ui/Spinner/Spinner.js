import MDSpinner from "react-md-spinner";
import React from "react";

const color1 = "#50e3c2";
const color2 = "#00adb5";

export default function Spinner({
  ...props
}) {
  return <MDSpinner
    {...props}
    color1={color1}
    color2={color2}
    color3={color1}
    color4={color2}
  />;
}
