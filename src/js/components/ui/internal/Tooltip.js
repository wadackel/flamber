import assign from "object-assign";
import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

export default class Tooltip extends React.Component {
  static propTypes = {
    baseClassName: PropTypes.string.isRequired,
    className: PropTypes.string,
    show: PropTypes.bool,
    label: PropTypes.string.isRequired,
    origin: OriginalPropTypes.origin
  };

  static defaultPropTypes = {
    show: false,
    origin: {
      vertical: "top",
      horizontal: "center"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.setTooltipSize();
    this.setRippleSize();
  }

  componentWillReceiveProps() {
    this.setTooltipSize();
  }

  componentDidUpdate() {
    this.setRippleSize();
  }

  setTooltipSize() {
    const { tooltip } = this.refs;

    this.setState({
      width: parseInt(tooltip.offsetWidth, 10),
      height: parseInt(tooltip.offsetHeight, 10)
    });
  }

  setRippleSize() {
    const { tooltip, ripple } = this.refs;
    const width = parseInt(tooltip.offsetWidth, 10) /
      (this.props.origin.horizontal === "center" ? 2 : 1);
    const height = parseInt(tooltip.offsetHeight, 10);
    const rippleSize = Math.ceil(
      (Math.sqrt(Math.pow(height, 2)) +
      Math.sqrt(Math.pow(width, 2)) * 2)
    );

    ripple.style.width = `${rippleSize}px`;
    ripple.style.height = `${rippleSize}px`;
  }

  getStyles() {
    const { origin } = this.props;
    const { width, height } = this.state;

    const vertical = {
      top: { bottom: "90%" },
      middle: { top: "50%", marginTop: height / 2 * -1 },
      bottom: { top: "90%" }
    };

    const horizontal = {
      left: { right: "90%" },
      center: { left: "50%", marginLeft: width / 2 * -1 },
      right: { left: "90%" }
    };

    return assign(
      vertical[origin.vertical],
      horizontal[origin.horizontal]
    );
  }

  render() {
    const {
      baseClassName,
      className,
      show,
      label,
      origin
    } = this.props;

    const b = bem(baseClassName);
    const modifier = {
      show,
      [`${origin.vertical}-${origin.horizontal}`]: true
    };

    return (
      <div
        ref="tooltip"
        className={mergeClassNames(b(modifier), className)}
        style={this.getStyles()}
      >
        <div ref="ripple" className={b("ripple", modifier)} />
        <span className={b("label", modifier)}>{label}</span>
      </div>
    );
  }
}
