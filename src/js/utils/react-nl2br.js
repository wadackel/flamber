// @flow
import React from "react";

const regex = /(\r\n|\n\r|\r|\n)/g;

export default function nl2br(str: string | number) {
  if (typeof str === "number") {
    return str;
  }

  return str.split(regex).map((line, i) =>
    line.match(regex) ? React.createElement("br", { key: i }) : line
  );
}
