import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MDSpinner from "react-md-spinner";
import shareConfig from "../../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import FirstChild from "../internal/FirstChild";
import RenderToLayer from "../internal/RenderToLayer";
import Overlay from "../internal/Overlay";
import { IconButton } from "../";
import { CloseIcon } from "../../svg-icons/";

const b = bem("dialog");

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
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    processing: false,
    width: 450,
    open: false,
    onRequestClose: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};

    bindHandlers([
      "renderLayer",
      "handleCloseClick",
      "handleOverlayClick"
    ], this);
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

    return (
      <div className={b("process-overlay", { processing })}>
        <MDSpinner className={b("process-overlay__spinner")} size={34} />
      </div>
    );
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

  renderLayer() {
    const {
      children,
      className,
      processing,
      open
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
          {open ? <div className={b("wrapper", modifier)}>
            <div className={b("horizontal", modifier)}>
              <div className={b("vertical", modifier)}>
                <div className={mergeClassNames(b(modifier), className)}>
                  {this.renderProcessOverlay()}
                  <div className={b("container", modifier)}>
                    {this.renderHeader()}
                    <div className={b("body", modifier)}>
                      {children}
                    </div>
                    {this.renderActions()}
                  </div>
                </div>
              </div>
            </div>
            <Overlay
              className={b("overlay", modifier)}
              show={open}
              onClick={this.handleOverlayClick}
            />
          </div> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  render() {
    return <RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />;
  }
}
