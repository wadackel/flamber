// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import prefixer from "../../../helpers/prefixer";
import {
  FloatingButton
} from "../";
import { PlusIcon } from "../../svg-icons/";

const b = bem("floating-menu");

type Props = {
  children?: React$Element<any>;
  className?: string;
  open: boolean;
  onRequestOpen?: Function;
  onRequestClose?: Function;
};

export default class FloatingMenu extends Component {
  props: Props;

  static defaultProps = {
    open: false
  }

  handleToggleClick = () => {
    if (this.props.open) {
      if (typeof this.props.onRequestClose === "function") {
        this.props.onRequestClose();
      }

    } else if (typeof this.props.onRequestOpen === "function") {
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
