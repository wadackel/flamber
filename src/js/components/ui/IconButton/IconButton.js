import React, { PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import Button from "../internal/Button";
import Tooltip from "../internal/Tooltip";

const b = bem("icon-button");

export default class IconButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.element,
    tooltip: PropTypes.string,
    tooltipOrigin: OriginalPropTypes.origin,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static defaultProps = {
    type: "default",
    tooltipOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showTooltip: false
    };

    bindHandlers([
      "handleMouseEnter",
      "handleMouseLeave"
    ], this);
  }

  handleMouseEnter(e) {
    this.setState({ showTooltip: true });
    this.props.onMouseEnter(e);
  }

  handleMouseLeave(e) {
    this.setState({ showTooltip: false });
    this.props.onMouseLeave(e);
  }

  render() {
    const {
      tooltip,
      tooltipOrigin,
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const { showTooltip } = this.state;

    return (
      <Button
        baseClassName={b().trim()}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...otherProps}
      >
        {tooltip &&
          <Tooltip
            baseClassName={b("tooltip").trim()}
            show={showTooltip}
            label={tooltip}
            origin={tooltipOrigin}
          />
        }
      </Button>
    );
  }
}
