// @flow
import React from "react";

type Props = {
  children: React$Element<any>;
};

export default function FirstChild(props: Props) {
  const children = React.Children.toArray(props.children);

  return children[0] || null;
}
