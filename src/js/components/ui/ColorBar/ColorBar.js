import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("color-bar");

class ColorBarItem extends Component {
  static propTypes = {
    color: PropTypes.string,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e, this.props.color);
  }

  render() {
    const { color, selectable, selected } = this.props;

    return (
      <span
        className={b("item", { selectable, selected })()}
        style={{ backgroundColor: color }}
        onClick={this.handleClick}
      />
    );
  }
}

export default class ColorBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    selectable: PropTypes.bool,
    palette: PropTypes.array,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    selectable: false,
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
    color: null,
    onClick: () => {},
    onItemClick: () => {},
    onChange: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleItemClick(e, color) {
    this.props.onItemClick(e, color);

    if (this.props.selectable) {
      this.props.onChange(this.props.color !== color ? color : null);
    }
  }

  render() {
    const {
      className,
      selectable,
      palette,
      color,
      onClick
    } = this.props;

    const items = palette.map(value =>
      <ColorBarItem
        key={value}
        color={value}
        selectable={selectable}
        selected={color === value}
        onClick={this.handleItemClick}
      />
    );

    const modifier = { selectable };

    return (
      <div
        className={mergeClassNames(b(modifier)(), className)}
        onClick={onClick}
      >
        <div className={b("list", modifier)()}>
          {items}
        </div>
      </div>
    );
  }
}
