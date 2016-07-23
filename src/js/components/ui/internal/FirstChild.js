import React from "react";

export default function FirstChild(props) {
  const children = React.Children.toArray(props.children);

  return children[0] || null;
}
