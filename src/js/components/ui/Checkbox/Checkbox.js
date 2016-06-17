/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("checkbox");

// TODO
export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    onCheck: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    onCheck: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
    ], this);
  }

  render() {
    return (
      <div>Checkbox: TODO</div>
    );
  }
}
