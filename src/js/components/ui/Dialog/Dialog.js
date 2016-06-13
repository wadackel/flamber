import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import bem from "../../../helpers/bem";
import shareConfig from "../../../../share-config.json";
import bindHandlers from "../../../helpers/bind-handlers";
import RenderToLayer from "../internal/RenderToLayer";
import Overlay from "../internal/Overlay";
import { IconButton } from "../";
import CloseIcon from "../../svg-icons/CloseIcon";

const b = bem("dialog");

function FirstChild(props) {
  const children = React.Children.toArray(props.children);

  return children[0] || null;
}

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
      "renderLayer",
      "handleCloseClick",
      "handleOverlayClick"
    ], this);
  }

  handleCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestClose();
  }

  handleOverlayClick() {
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

  renderLayer() {
    const {
      children,
      open
    } = this.props;

    const modifier = { open };

    return (
      <div>
        <ReactCSSTransitionGroup
          component={FirstChild}
          transitionName="open"
          transitionEnterTimeout={shareConfig["dialog-enter-duration"]}
          transitionLeaveTimeout={shareConfig["dialog-leave-duration"]}
        >
          {open ? <div className={b("wrapper", modifier)}>
            <div className={b(modifier)}>
              <div className={b("container", modifier)}>
                {this.renderHeader()}
                <div className={b("body", modifier)}>
                  {children}
                </div>
                {this.renderActions()}
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
