import React, { PropTypes } from "react";
import Portal from "../internal/Portal";
// import bindHandlers from "../../../helpers/bind-handlers";

export default class Overlay extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    className: PropTypes.string,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    onRequestClose: () => {}
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.className); // eslint-disable-line
    // if (nextProps.className !== this.props.className) {
    //   this.refs.portal.className = nextProps.className;
    // }
  }

  render() {
    const {
      children,
      open,
      className,
      onRequestClose
    } = this.props;

    return (
      <Portal
        className={className}
        open={open}
        onRequestClose={onRequestClose}
      >
        {children}
      </Portal>
    );
  }
}
