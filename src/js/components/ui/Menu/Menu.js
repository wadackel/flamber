/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import { List } from "../";

const b = bem("menu");

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onItemClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any,
  };

  static defaultProps = {
    onItemClick: () => {},
    onChange: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    bindHandlers([
      "handleItemClick"
    ], this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.value !== this.state.value) {
      this.props.onChange(nextState.value);
    }
  }

  handleItemClick(menuItem, value, index) {
    this.setState({ value });
    this.props.onItemClick(menuItem, value, index);
  }

  render() {
    const {
      className,
      children,
    } = this.props;

    const cloneChildren = children.map((item, index) =>
      React.cloneElement(item, {
        key: item.props.text,
        onClick: this.handleItemClick,
        index
      })
    );

    return (
      <List
        className={`${b()} ${className ? className : ""}`}
      >
        {cloneChildren}
      </List>
    );
  }
}
