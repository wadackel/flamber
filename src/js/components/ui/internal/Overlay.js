import React, { PropTypes } from "react";
import Portal from "react-portal";

export default class Overlay extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.className !== this.props.className) {
      this.refs.portal.className = nextProps.className;
    }
  }

  render() {
    const {
      open,
      children,
      className
    } = this.props;

    return (
      <Portal
        ref="portal"
        className={className}
        isOpened={open}
      >
        {children}
      </Portal>
    );
  }
}
