import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("label");

export default class Label extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.element
  };

  render() {
    const {
      children,
      className,
      icon
    } = this.props;

    return (
      <div className={mergeClassNames(b(), className)}>
        {icon && <span className={b("icon")}>{icon}</span>}
        {children}
      </div>
    );
  }
}
