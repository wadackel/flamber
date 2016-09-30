// @flow
import MDSpinner from "react-md-spinner";
import React from "react";

const color1 = "#50e3c2";
const color2 = "#00adb5";

type Props = {
  className?: string;
  userAgent?: string;
  style?: Object;
  singleColor?: string;
  size?: string | number;
  duration?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
};

export default function Spinner(props: Props) {
  return <MDSpinner
    {...props}
    color1={color1}
    color2={color2}
    color3={color1}
    color4={color2}
  />;
}
