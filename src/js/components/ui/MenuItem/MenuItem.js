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
    focused: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    selected: false,
    focused: false,
    onClick: () => {}
  }

  componentDidMount() {
    this.applyFocus();
  }

  componentDidUpdate() {
    this.applyFocus();
  }

  applyFocus() {
    if (this.props.focused) {
      this.refs.listItem.applyFocus();
    }
  }

  render() {
    const {
      className,
      style,
      text,
      index,
      value,
      selected,
      focused,
      onClick
    } = this.props;

    return <ListItem
      ref="listItem"
      className={mergeClassNames(b({ selected, focused })(), className)}
      style={style}
      text={text}
      index={index}
      value={value}
      editable={false}
      onClick={onClick}
    />;
  }
}
