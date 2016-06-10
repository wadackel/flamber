import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import Overlay from "../internal/Overlay";
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
    modal: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    width: 450,
    open: false,
    modal: true,
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
      "handleCloseClick"
    ], this);
  }

  handleCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestClose();
  }

  renderHeader() {
    const {
      title,
      titleIcon
    } = this.props;

    if (!title) return null;

    const titleIconElement = titleIcon ? <span className={b("icon")}>{titleIcon}</span> : null;

    return (
      <div className={b("header")}>
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
    const { actions } = this.props;

    if (!actions) return null;

    const actionElements = actions.map((action, i) =>
      React.cloneElement(action, { key: i })
    );

    return (
      <div className={b("actions")}>
        {actionElements}
      </div>
    );
  }

  render() {
    const {
      children,
      width,
      open,
      modal
    } = this.props;

    return (
      <div
        className={b({ open })}
        style={{
          width
        }}
      >
        {this.renderHeader()}
        <div className={b("body")}>
          {children}
        </div>
        {this.renderActions()}
        {modal ? <Overlay /> : null}
      </div>
    );
  }
}
