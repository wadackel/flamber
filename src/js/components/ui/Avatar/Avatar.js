import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";

const b = bem("avatar");

export default class Avatar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleClick"
    ], this);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick();
  }

  render() {
    const {
      className,
      name,
      email,
      icon
    } = this.props;

    const iconStyle = {
      backgroundImage: `url("${icon}")`
    };

    return (
      <div
        className={mergeClassNames(b(), className)}
        onClick={this.handleClick}
      >
        <div className={b("inner")}>
          <div className={b("text")}>
            <div className={b("name")}>{name}</div>
            <div className={b("email")}>{email}</div>
          </div>
          <div className={b("icon")} style={iconStyle} />
        </div>
      </div>
    );
  }
}
