import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("progress-bar");

export default class ProgressBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
    min: PropTypes.number
  };

  static defaultProps = {
    max: 100,
    min: 0
  };

  render() {
    const {
      className,
      value,
      max,
      min
    } = this.props;

    const valueStyle = {
      width: `${Math.min(Math.max(min, value), max) / (max - min) * 100}%`
    };

    return (
      <div className={mergeClassNames(b(), className)}>
        <div className={b("value")()} style={valueStyle} />
      </div>
    );
  }
}
