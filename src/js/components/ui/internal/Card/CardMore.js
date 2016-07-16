/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../../helpers/bem";
import mergeClassNames from "../../../../helpers/merge-class-names";
import bindHandlers from "../../../../helpers/bind-handlers";
import { IconButton } from "../../";
import { MoreVertIcon } from "../../../svg-icons";

export default class CardMore extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    actions: PropTypes.node
  };

  constructor(props, context) {
    super(props, context);

    this.state = { show: false };

    bindHandlers([
      "handleMouseLeave",
      "handleMoreClick"
    ], this);
  }

  handleMouseLeave() {
    this.setState({ show: false });
  }

  handleMoreClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ show: true });
  }

  render() {
    const {
      baseClassName,
      className,
      actions
    } = this.props;

    const { show } = this.state;

    const modifier = { show };
    const b = bem(`${baseClassName.trim()}__more`);

    const actionElements = React.Children.map(actions, (action, index) =>
      React.cloneElement(action, {
        key: index,
        className: b("action", modifier)
      })
    );

    return (
      <div className={mergeClassNames(b(modifier), className)} onMouseLeave={this.handleMouseLeave}>
        <div className={b("actions", modifier)}>
          {actionElements}
        </div>
        <IconButton
          className={b("trigger", modifier)}
          icon={<MoreVertIcon />}
          onClick={this.handleMoreClick}
        />
      </div>
    );
  }
}
