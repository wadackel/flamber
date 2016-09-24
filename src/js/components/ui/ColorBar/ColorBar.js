import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("color-bar");


class ColorBarItem extends Component {
  static propTypes = {
    color: PropTypes.any,
    clickable: PropTypes.bool,
    onClick: PropTypes.func
  };

  constructor(props, context) {
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


export default function ColorBar({
  className,
  clickable,
  itemClickable,
  lineWidth,
  palette,
  onClick,
  onItemClick
}) {
  const children = palette.map(color =>
    <ColorBarItem
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

ColorBar.propTypes = {
  className: PropTypes.string,
  clickable: PropTypes.bool,
  itemClickable: PropTypes.bool,
  lineWidth: PropTypes.number,
  palette: PropTypes.array,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func
};

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
