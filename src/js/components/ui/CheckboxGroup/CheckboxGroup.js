/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("checkbox-group");

// TODO
export default class CheckboxGroup extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    className: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
      "handleChange"
    ], this);
  }

  handleChange() {
    // TODO
  }

  render() {
    const {
      children,
      className,
      name,
      value,
    } = this.props;

    // TODO
    return (
      <div className={mergeClassNames(b(), className)}>
        {children}
      </div>
    );
  }
}
