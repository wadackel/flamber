import keycode from "keycode";
import React, { PropTypes } from "react";
import shareConfig from "../../../../share-config.json";
import prefixer from "../../../helpers/prefixer";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { isValid } from "../../../helpers/validate";
import { List } from "../";

const b = bem("menu");

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.any,
    disableAutoFocus: PropTypes.bool,
    initiallyKeyboardFocused: PropTypes.bool,
    onItemClick: PropTypes.func,
    onChange: PropTypes.func,
    onMouseDown: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    disableAutoFocus: true,
    initiallyKeyboardFocused: false,
    onItemClick: () => {},
    onChange: () => {},
    onMouseDown: () => {},
    onEscKeyDown: () => {},
    onKeyDown: () => {}
  }

  constructor(props, context) {
    super(props, context);

    const focusIndex = this.getInitialFocusIndex(props);

    this.state = {
      value: props.value,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      focusIndex
    };

    bindHandlers([
      "handleItemClick",
      "handleKeyDown"
    ], this);
  }

  componentDidMount() {
    this.applyFocus();
  }

  componentDidUpdate() {
    this.applyFocus();
  }

  componentWillReceiveProps(nextProps) {
    const focusIndex = this.getInitialFocusIndex(nextProps);
    this.setState({ focusIndex });
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

  handleKeyDown(e) {
    const { focusedItem } = this.refs;
    const key = keycode(e);

    switch (key) {
      case "enter":
        if (focusedItem) {
          this.handleItemClick(
            focusedItem,
            focusedItem.props.value,
            this.state.focusIndex
          );
        }
        break;

      case "down":
      case "j":
        e.preventDefault();
        this.incrementKeyboardFocusIndex();
        break;

      case "esc":
        this.props.onEscKeyDown();
        break;

      case "tab":
        e.preventDefault();
        if (e.shiftKey) {
          this.decrementKeyboardFocusIndex();
        } else {
          this.incrementKeyboardFocusIndex();
        }
        break;

      case "up":
      case "k":
        e.preventDefault();
        this.decrementKeyboardFocusIndex();
        break;
    }

    this.props.onKeyDown(e);
  }

  applyFocus() {
    if (this.state.focusIndex >= 0) {
      this.refs.menu.focus();
    }
  }

  getInitialFocusIndex(props) {
    if (props.disableAutoFocus) {
      return -1;
    }

    const selectedIndex = this.getSelectedIndex(props);

    return selectedIndex >= 0 ? selectedIndex : 0;
  }

  incrementKeyboardFocusIndex() {
    const { focusIndex } = this.state;
    const maxIndex = this.props.children.length - 1;
    const index = focusIndex + 1;

    this.setFocusIndex(index > maxIndex ? 0 : index, true);
  }

  decrementKeyboardFocusIndex() {
    const { focusIndex } = this.state;
    const maxIndex = this.props.children.length - 1;
    const index = focusIndex - 1;

    this.setFocusIndex(index < 0 ? maxIndex : index, true);
  }

  getSelectedIndex(props) {
    let selectedIndex = -1;

    props.children.forEach((child, index) => {
      if (this.isChildSelected(child, props)) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  }

  isChildSelected(child, props) {
    return child.props.hasOwnProperty("value") && props.value === child.props.value;
  }

  setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused
    });
  }

  focus() {
    this.refs.menu.focus();
  }

  blur() {
    this.refs.menu.blur();
  }

  render() {
    const {
      className,
      children,
      value,
      onMouseDown
    } = this.props;

    const { focusIndex } = this.state;

    const childLength = children.length;
    const childDelayIncrement = Math.floor((shareConfig["popover-duration"] / 2) / childLength);

    const cloneChildren = children.map((item, index) => {
      const isFocused = focusIndex === index;

      return React.cloneElement(item, {
        key: item.props.text,
        onClick: this.handleItemClick,
        style: prefixer.prefix({
          transitionDelay: `${childDelayIncrement * index}ms`
        }),
        selected: (isValid(value) && isValid(item.props.value) && value === item.props.value),
        focused: isFocused,
        ref: isFocused ? "focusedItem" : null,
        index
      });
    });

    return (
      <List
        ref="menu"
        className={mergeClassNames(b(), className)}
        onMouseDown={onMouseDown}
        onKeyDown={this.handleKeyDown}
      >
        {cloneChildren}
      </List>
    );
  }
}
