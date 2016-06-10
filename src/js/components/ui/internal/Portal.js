import React, { PropTypes } from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import shallowCompare from "react/lib/shallowCompare";
import bindHandlers from "../../../helpers/bind-handlers";

const KEY_CODES = {
  ESC: 27
};

export default class Portal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    className: "",
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = { active: false };
    this.portal = null;
    this.node = null;

    bindHandlers([
      "handleOutsideClick",
      "handleKeydown"
    ], this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);
    document.addEventListener("click", this.handleOutsideClick, false);
    this.openPortal();
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.open !== "undefined") {
      if (nextProps.open) {
        if (this.state.active) {
          this.renderPortal(nextProps);
        } else {
          this.openPortal(nextProps);
        }

        if (!nextProps.open && this.state.active) {
          this.closePortal();
        }
      }

    } else if (this.state.active) {
      this.renderPortal(nextProps);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
    this.closePortal(true);
  }

  handleOutsideClick(e) {
    if (!this.state.active) return;
    const root = findDOMNode(this.portal);
    if (root.contains(e.target) || (e.button && e.button !== 0)) return;
    e.stopPropagation();
    this.props.onRequestClose();
  }

  handleKeydown(e) {
    if (e.keyCode === KEY_CODES.ESC && this.state.active) {
      this.props.onRequestClose();
    }
  }

  openPortal(props = this.props) {
    this.setState({ active: true });
    this.renderPortal(props);
  }

  closePortal(isUnmounted = false) {
    if (!this.state.active) return;
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }

    this.portal = null;
    this.node = null;
    if (!isUnmounted) {
      this.setState({ active: false });
    }
  }

  renderPortal(props) {
    if (!this.node) {
      this.node = document.createElement("div");
      document.body.appendChild(this.node);
    }

    this.node.className = props.className;

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      React.cloneElement(props.children, { closePortal: this.closePortal }),
      this.node
    );
  }

  render() {
    return null;
  }
}
