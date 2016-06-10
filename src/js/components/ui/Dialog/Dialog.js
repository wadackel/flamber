import React, { PropTypes } from "react";
import { Motion, spring } from "react-motion";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import RenderToLayer from "../internal/RenderToLayer";
import { IconButton } from "../";
import CloseIcon from "../../svg-icons/CloseIcon";

const b = bem("dialog");

export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleIcon: PropTypes.element,
    actions: PropTypes.node,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    width: 450,
    open: false,
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
      "handleCloseClick",
      "handleOverlayClose"
    ], this);
  }

  handleCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestClose();
  }

  handleOverlayClose() {
    this.props.onRequestClose();
  }

  renderHeader() {
    const {
      open,
      title,
      titleIcon
    } = this.props;

    if (!title) return null;

    const titleIconElement = titleIcon ? <span className={b("icon")}>{titleIcon}</span> : null;

    return (
      <div className={b("header", { open })}>
        <h3 className={b("title")}>{titleIconElement}{title}</h3>
        <IconButton
          className={b("close")}
          icon={<CloseIcon />}
          onClick={this.handleCloseClick}
        />
      </div>
    );
  }

  renderActions() {
    const {
      open,
      actions
    } = this.props;

    if (!actions) return null;

    const actionElements = actions.map((action, i) =>
      React.cloneElement(action, { key: i })
    );

    return (
      <div className={b("actions", { open })}>
        {actionElements}
      </div>
    );
  }

  render() {
    const {
      children,
      width,
      open
    } = this.props;

    const modifier = { open };

    return (
      <Overlay
        open={open}
        onRequestClose={this.handleOverlayClose}
      >
        <Motion
          style={{
            x: spring(open ? width : 0)
          }}
        >
        {({ x }) =>
          <div
            className={b(modifier)}
            style={{
              width: x
            }}
          >
            <div className={b("container")}>
              {this.renderHeader()}
              <div className={b("body", modifier)}>
                {children}
              </div>
              {this.renderActions()}
            </div>
          </div>
        }
        </Motion>
      </Overlay>
    );
  }
}
