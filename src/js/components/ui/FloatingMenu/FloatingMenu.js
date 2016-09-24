import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import prefixer from "../../../helpers/prefixer";
import {
  FloatingButton
} from "../";
import { PlusIcon } from "../../svg-icons/";

const b = bem("floating-menu");

export default class FloatingMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool,
    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    onRequestOpen: () => {},
    onRequestClose: () => {}
  }

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleToggleClick() {
    if (this.props.open) {
      this.props.onRequestClose();
    } else {
      this.props.onRequestOpen();
    }
  }

  render() {
    const {
      children,
      className,
      open
    } = this.props;

    const modifier = { open };
    const translateY = 70;
    const childArray = React.Children.toArray(children);
    const childrenCount = childArray.length;
    const cloneChildren = childArray.map((child, index) =>
      React.cloneElement(child, {
        key: index,
        className: b("item", modifier)(),
        style: prefixer.prefix({
          transform: `scale(.1) translateY(${translateY * (childrenCount - index)}px)`
        })
      })
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("list", modifier)()}>
          {cloneChildren}
        </div>
        <FloatingButton
          type="primary"
          className={b("toggle", modifier)()}
          icon={<PlusIcon />}
          onClick={this.handleToggleClick}
        />
      </div>
    );
  }
}
