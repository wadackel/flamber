import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Popover, Menu } from "../";
import { CaretIcon } from "../../svg-icons/";

const b = bem("drop-down-menu");

export default class DropDownMenu extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.oneOf(["block", "inline"]),
    origin: OriginalPropTypes.origin,
    triggerOrigin: OriginalPropTypes.origin,
    before: PropTypes.node,
    onChange: PropTypes.func
  };

  static defaultProps = {
    type: "inline",
    origin: { vertical: "top", horizontal: "left" },
    triggerOrigin: { vertical: "top", horizontal: "left" },
    onChange: () => {}
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      triggerElement: null
    };

    autoBind(this);
  }

  componentDidMount() {
    this.setMenuWidth();
  }

  componentDidUpdate() {
    this.setMenuWidth();
  }

  handleTriggerClick(e) {
    e.stopPropagation();

    this.setState({
      open: true,
      triggerElement: e.currentTarget
    });
  }

  handleItemClick(menuItem, value) {
    this.setState({ open: false });
    this.props.onChange(value);
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  setMenuWidth() {
    if (!this.state.open) return;

    const triggerElement = ReactDOM.findDOMNode(this.refs.triggerElement); // eslint-disable-line react/no-find-dom-node
    const menu = ReactDOM.findDOMNode(this.refs.menu); // eslint-disable-line react/no-find-dom-node

    if (!menu) return;

    menu.style.minWidth = `${triggerElement.offsetWidth}px`;
  }

  render() {
    const {
      children,
      className,
      before,
      value,
      origin,
      triggerOrigin,
      type
    } = this.props;

    const { theme } = this.context;

    const {
      open,
      triggerElement
    } = this.state;

    const modifier = {
      [type]: true,
      theme,
      open
    };

    let displayValue = "";

    React.Children.forEach(children, item => {
      if (item.props.value === value) {
        displayValue = item.props.primary;
      }
    });

    const beforeElement = before && <div className={b("before", modifier)()}>
      {before}
    </div>;

    return (
      <div className={mergeClassNames(b(modifier)(), className)}>
        <div
          ref="triggerElement"
          className={b("trigger", modifier)()}
          onClick={this.handleTriggerClick}
        >
          {beforeElement}
          {displayValue}
          <div className={b("icon", modifier)()}>
            <CaretIcon />
          </div>
        </div>
        <Popover
          open={open}
          origin={origin}
          triggerOrigin={triggerOrigin}
          triggerElement={triggerElement}
          onRequestClose={this.handleRequestClose}
        >
          <Menu
            ref="menu"
            disableAutoFocus={false}
            initiallyKeyboardFocused={true}
            value={value}
            onItemClick={this.handleItemClick}
            onEscKeyDown={this.handleRequestClose}
          >
            {children}
          </Menu>
        </Popover>
      </div>
    );
  }
}
