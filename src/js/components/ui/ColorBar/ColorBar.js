import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("color-bar");

function ColorBarItem({
  color,
  selected,
  onClick
}) {

  function handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    onClick(color);
  }

  return (
    <div
      className={b("item", { selected })()}
      style={{ backgroundColor: color }}
      onClick={handleChange}
    />
  );
}

ColorBarItem.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

export default class ColorBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    palette: PropTypes.array,
    color: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
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
    onChange: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleItemClick(value) {
    this.props.onChange(this.props.color !== value ? value : null);
  }

  render() {
    const {
      className,
      palette,
      color
    } = this.props;

    const items = palette.map(value =>
      <ColorBarItem
        key={value}
        color={value}
        selected={color === value}
        onClick={this.handleItemClick}
      />
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("list")()}>
          {items}
        </div>
      </div>
    );
  }
}
