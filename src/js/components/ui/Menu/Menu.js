// @flow
import keycode from "keycode";
import React, { Component, isValidElement } from "react";
import shareConfig from "../../../share-config.json";
import prefixer from "../../../helpers/prefixer";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { isValid } from "../../../helpers/validate";
import { List, MenuItem } from "../";

const b = bem("menu");

type Props = {
  className?: string;
  children?: React$Element<any>;
  value?: any;
  disableAutoFocus: boolean;
  initiallyKeyboardFocused: boolean;
  onItemClick?: Function;
  onMouseDown?: Function;
  onChange?: Function;
  onKeyDown?: Function;
  onEscKeyDown?: Function;
  onUpdateFocusIndex?: Function;
};

type State = {
  value: any;
  isKeyboardFocused: boolean;
  focusIndex: number;
};

export default class Menu extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    disableAutoFocus: true,
    initiallyKeyboardFocused: false,
    onItemClick: () => {},
    onChange: () => {},
    onMouseDown: () => {},
    onEscKeyDown: () => {},
    onKeyDown: () => {},
    onUpdateFocusIndex: () => {}
  }

  constructor(props: Props, context: Object) {
    super(props, context);

    const focusIndex = this.getInitialFocusIndex(props);

    this.state = {
      value: props.value,
      isKeyboardFocused: props.initiallyKeyboardFocused,
      focusIndex
    };
  }

  componentDidMount() {
    this.applyFocus();
  }

  componentDidUpdate() {
    this.applyFocus();
  }

  componentWillReceiveProps(nextProps: Props) {
    const focusIndex = this.getInitialFocusIndex(nextProps);
    this.setState({ focusIndex });
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.value !== this.state.value && typeof this.props.onChange === "function") {
      this.props.onChange(nextState.value);
    }
  }

  handleItemClick = (menuItem: MenuItem, value: any, index: number) => {
    this.setState({ value });
    if (typeof this.props.onItemClick === "function") {
      this.props.onItemClick(menuItem, value, index);
    }
  }

  handleKeyDown = (e: SyntheticKeyboardEvent) => {
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
        if (typeof this.props.onEscKeyDown === "function") {
          this.props.onEscKeyDown(e);
        }
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

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(e);
    }
  }

  getMenuItems(): Array<React$Element<any>> {
    const children = [];

    React.Children.forEach(this.props.children, child => {
      if (isValidElement(child) && child.type === MenuItem) {
        children.push(child);
      }
    });

    return children;
  }

  applyFocus(): void {
    if (this.state.focusIndex >= 0) {
      this.refs.menu.focus();
    }
  }

  getInitialFocusIndex(props: Props): number {
    if (props.disableAutoFocus) {
      return -1;
    }

    const selectedIndex = this.getSelectedIndex(props);

    return selectedIndex >= 0 ? selectedIndex : 0;
  }

  incrementKeyboardFocusIndex(): void {
    const { focusIndex } = this.state;
    const index = focusIndex + 1;

    this.setFocusIndex(index, true);
  }

  decrementKeyboardFocusIndex(): void {
    const { focusIndex } = this.state;
    const index = focusIndex - 1;

    this.setFocusIndex(index, true);
  }

  getSelectedIndex(props: Props): number {
    const menuItems = this.getMenuItems();
    let selectedIndex = -1;

    menuItems.forEach((child, index) => {
      if (this.isChildSelected(child, props)) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  }

  isChildSelected(child: React$Element<any>, props: Props): boolean {
    return child.props.hasOwnProperty("value") && props.value === child.props.value;
  }

  setFocusIndex(newIndex: number, isKeyboardFocused: boolean): void {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused
    });

    if (typeof this.props.onUpdateFocusIndex === "function") {
      this.props.onUpdateFocusIndex(newIndex, isKeyboardFocused);
    }
  }

  focus(): void {
    this.refs.menu.focus();
  }

  blur(): void {
    this.refs.menu.blur();
  }

  render() {
    const {
      className,
      value,
      onMouseDown
    } = this.props;

    const { focusIndex } = this.state;

    const menuItems = this.getMenuItems();
    const childDelayIncrement = Math.floor((shareConfig["popover-duration"] / 2) / menuItems.length);

    const closeMenuItems = menuItems.map((item, index) => {
      const isFocused = focusIndex === index;

      return React.cloneElement(item, {
        key: item.props.primary,
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
        {closeMenuItems}
      </List>
    );
  }
}
