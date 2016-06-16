import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ListItem } from "../";

const b = bem("menu-item");

export default class MenuItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.any,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    selected: false,
    onClick: () => {}
  }

  render() {
    const {
      className,
      style,
      text,
      index,
      value,
      selected,
      onClick
    } = this.props;

    return <ListItem
      className={mergeClassNames(b({ selected }), className)}
      style={style}
      text={text}
      index={index}
      value={value}
      editable={false}
      onClick={onClick}
    />;
  }
}
