import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("spinner");

export default class Spinner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    size: PropTypes.oneOf(["xl", "lg", "md", "sm", "xs"]),
    customSize: PropTypes.number
  };

  static defaultProps = {
    show: false,
    size: "md"
  };

  render() {
    const {
      className,
      show,
      size,
      customSize
    } = this.props;

    const modifier = { show };
    const iconStyle = {};

    if (customSize) {
      iconStyle.width = customSize;
      iconStyle.height = customSize;
    } else {
      modifier[size] = true;
    }

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        <svg
          className={b("icon", modifier)}
          style={iconStyle}
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={b("path")}
            fill="none"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
          />
        </svg>
      </div>
    );
  }
}
