// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import type { Palette } from "../../../types/prop-types";

const b = bem("color-bar");

type ItemProps = {
  color: any;
  clickable: boolean;
  onClick: Function;
};

export class ColorBarItem extends Component {
  props: ItemProps;

  constructor(props: ItemProps, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleClick() {
    this.props.onClick(this.props.color);
  }

  render() {
    const { color, clickable } = this.props;
    const modifier = { clickable };

    return (
      <span
        className={b("item", modifier)()}
        style={{
          backgroundColor: color
        }}
        onClick={clickable ? this.handleClick : null}
      />
    );
  }
}


type Props = {
  className?: string;
  clickable: boolean;
  itemClickable: boolean;
  lineWidth: number;
  palette: Palette;
  onClick: Function;
  onItemClick: Function;
};

export default function ColorBar(props: Props) {
  const {
    className,
    clickable,
    itemClickable,
    lineWidth,
    palette,
    onClick,
    onItemClick
  } = props;

  const children = palette.map(color =>
    <ColorBarItem
      key={color}
      color={color}
      clickable={itemClickable}
      onClick={onItemClick}
    />
  );

  const modifier = { clickable };

  return (
    <div
      className={mergeClassNames(b(modifier)(), className)}
      onClick={clickable ? onClick : null}
      style={{ height: lineWidth }}
    >
      <div className={b("inner")()}>
        {children}
      </div>
    </div>
  );
}

ColorBar.defaultProps = {
  clickable: false,
  itemClickable: false,
  lineWidth: 8,
  palette: [
    "#992220",
    "#d2241e",
    "#ec6598",
    "#4b4fa8",
    "#1da6d4",
    "#78d2d2",
    "#87cf3b",
    "#4b7610",
    "#787710",
    "#fffc00",
    "#ffa400",
    "#ff780d",
    "#784b1b",
    "#222222",
    "#808080",
    "#ffffff"
  ],
  onClick: () => {},
  onItemClick: () => {}
};
