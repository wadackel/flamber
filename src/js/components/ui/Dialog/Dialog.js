import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import FirstChild from "../internal/FirstChild";
import RenderToLayer from "../internal/RenderToLayer";
import Overlay from "../internal/Overlay";
import { IconButton, ProcessingOverlay } from "../";
import { CloseIcon } from "../../svg-icons/";

const b = bem("dialog");

class DialogInline extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    processing: PropTypes.bool,
    width: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleIcon: PropTypes.element,
    actions: PropTypes.node,
    open: PropTypes.bool.isRequired,
    escClose: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.afterRendeFocus = false;

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.afterRenderFocus = true;
    }
  }

  componentDidUpdate() {
    const { dialog } = this.refs;

    if (dialog && this.afterRenderFocus) {
      this.afterRenderFocus = false;
      dialog.focus();
    }
  }

  handleKeyDown(e) {
    const { open } = this.props;
    const { dialog } = this.refs;
    const key = keycode(e);

    if (open && key === "esc" && e.target === dialog) {
      this.requestClose();
    }
  }

  handleCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.requestClose();
  }

  handleOverlayClick() {
    this.requestClose();
  }

  requestClose() {
    if (!this.props.processing) {
      this.props.onRequestClose();
    }
  }

  renderProcessOverlay() {
    const { processing } = this.props;

    return <ProcessingOverlay
      className={b("processing-overlay", { processing })()}
      show={processing}
      spinerSize={34}
    />;
  }

  renderHeader() {
    const {
      open,
      title,
      titleIcon
    } = this.props;

    if (!title) return null;

    const titleIconElement = titleIcon ? <span className={b("icon")()}>{titleIcon}</span> : null;

    return (
      <div className={b("header", { open })()}>
        <h3 className={b("title")()}>{titleIconElement}{title}</h3>
        <IconButton
          className={b("close")()}
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
      <div className={b("actions", { open })()}>
        {actionElements}
      </div>
    );
  }

  render() {
    const {
      children,
      className,
      processing,
      open,
      onDragEnter,
      onDragOver,
      onDragLeave
    } = this.props;

    const modifier = { open, processing };

    return (
      <div>
        <ReactCSSTransitionGroup
          component={FirstChild}
          transitionName="open"
          transitionEnterTimeout={shareConfig["dialog-enter-duration"]}
          transitionLeaveTimeout={shareConfig["dialog-leave-duration"]}
        >
          {open ? <div className={b("wrapper", modifier)()}>
            <div className={b("horizontal", modifier)()}>
              <div className={b("vertical", modifier)()}>
                <div
                  ref="dialog"
                  tabIndex="-1"
                  className={mergeClassNames(b(modifier)(), className)}
                  onKeyDown={this.handleKeyDown}
                  onDragEnter={onDragEnter}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                >
                  {this.renderProcessOverlay()}
                  <div className={b("container", modifier)()}>
                    {this.renderHeader()}
                    <div className={b("body", modifier)()}>
                      {children}
                    </div>
                    {this.renderActions()}
                  </div>
                </div>
              </div>
            </div>
            <Overlay
              className={b("overlay", modifier)()}
              show={open}
              onClick={this.handleOverlayClick}
            />
          </div> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    processing: PropTypes.bool,
    width: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleIcon: PropTypes.element,
    actions: PropTypes.node,
    open: PropTypes.bool.isRequired,
    escClose: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    width: 450,
    open: false,
    escClose: true,
    onRequestClose: () => {},
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  renderLayer() {
    return <DialogInline {...this.props} />;
  }

  render() {
    return <RenderToLayer
      render={this.renderLayer}
      open={true}
      useLayerForClickAway={false}
    />;
  }
}
