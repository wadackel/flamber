import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import prefixer from "../../../helpers/prefixer";
import {
  FloatingButton
} from "../";
import { PlusIcon } from "../../svg-icons/";

const b = bem("floating-menu");

export default class FloatingMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };

    bindHandlers([
      "handleToggleClick"
    ], this);
  }

  handleToggleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {
      children,
      className
    } = this.props;

    const { open } = this.state;
    const modifier = { open };

    const translateY = 30;
    const childrenCount = React.Children.count(children);
    const cloneChildren = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        key: index,
        className: b("item", modifier),
        style: prefixer.prefix({
          transform: `translateY(${translateY * (childrenCount - index - 1)}px)`
        })
      })
    );

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("list", modifier)}>
          {cloneChildren}
        </div>
        <FloatingButton
          type="primary"
          className={b("toggle", modifier)}
          icon={<PlusIcon />}
          onClick={this.handleToggleClick}
        />
      </div>
    );
  }
}
