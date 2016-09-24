import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";

const b = bem("processing-overlay");

export default class ProcessingOverlay extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool,
    spinnerSize: PropTypes.number
  };

  static defaultProps = {
    style: {},
    show: false,
    spinnerSize: 28
  };

  render() {
    const {
      className,
      style,
      show,
      spinnerSize
    } = this.props;

    const modifier = { show };

    return (
      <div className={mergeClassNames(b(modifier)(), className)} style={style}>
        {show &&
          <Spinner
            className={b("spinner", modifier)()}
            size={spinnerSize}
            style={{ position: "absolute" }}
          />
        }
      </div>
    );
  }
}
