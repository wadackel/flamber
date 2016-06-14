import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ListItem } from "../";

const b = bem("menu-item");

export default class MenuItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.any,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const {
      className,
      text,
      index,
      value,
      onClick
    } = this.props;

    return <ListItem
      className={mergeClassNames(b(), className)}
      text={text}
      index={index}
      value={value}
      editable={false}
      onClick={onClick}
    />;
  }
}
