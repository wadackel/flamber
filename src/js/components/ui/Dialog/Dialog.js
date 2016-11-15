// @flow
import _ from "lodash";
import autoBind from "auto-bind";
import keycode from "keycode";
import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shareConfig from "../../../share-config.json";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import FirstChild from "../internal/FirstChild";
import RenderToLayer from "../internal/RenderToLayer";
import Overlay from "../internal/Overlay";
import { IconButton, ProcessingOverlay } from "../";
import { CloseIcon } from "../../svg-icons/";

const b = bem("dialog");

type Props = {
  children?: React$Element<any>;
  className?: string;
  processing: boolean | string;
  width: number;
  title?: string;
  titleIcon?: React$Element<any>;
  actions?: React$Element<any>;
  open: boolean;
  escClose: boolean;
  onAfterOpen?: Function;
  onRequestClose: Function;
  onDragEnter?: Function;
  onDragOver?: Function;
  onDragLeave?: Function;
};

class DialogInline extends Component {
  props: Props;

  afterRenderFocus: boolean = false;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.open && nextProps.open) {
      this.afterRenderFocus = true;
    }
  }

  componentDidUpdate() {
    const { dialog } = this.refs;

    if (dialog && this.afterRenderFocus) {
      this.afterRenderFocus = false;
      dialog.focus();

      if (typeof this.props.onAfterOpen === "function") {
        this.props.onAfterOpen();
      }
    }
  }

  handleKeyDown(e: SyntheticKeyboardEvent) {
    const { open } = this.props;
    const key = keycode(e);

    if (open && key === "esc") {
      this.requestClose();
    }
  }

  handleCloseClick(e: SyntheticKeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.requestClose();
  }

  handleOverlayClick() {
    this.requestClose();
  }

  requestClose(): void {
    if (!this.props.processing) {
      this.props.onRequestClose();
    }
  }

  renderProcessOverlay(): React$Element<any> {
    const { processing } = this.props;

    return <ProcessingOverlay
      className={b("processing-overlay", { processing: !!processing })()}
      show={!!processing}
      spinerSize={34}
    >
      {typeof processing === "string" ? processing : null}
    </ProcessingOverlay>;
  }

  renderHeader(): ?React$Element<any> {
    const {
      open,
      title,
      titleIcon
    } = this.props;

    if (!title) return null;

    const titleIconElement = titleIcon ? <span className={b("icon")()}>{titleIcon}</span> : null;

    return (
      <div className={b("header", { open })()}>
        {titleIconElement}
        <h3 className={b("title")()}>{title}</h3>
        <IconButton
          className={b("close")()}
          icon={<CloseIcon />}
          onClick={this.handleCloseClick}
        />
      </div>
    );
  }

  renderActions(): ?React$Element<any> {
    const {
      open,
      actions
    } = this.props;

    if (!actions) return null;

    const actionElements = React.Children.map(actions, (action, i) =>
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
  props: Props;

  static defaultProps = {
    processing: false,
    width: 450,
    open: false,
    escClose: true
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  renderLayer(): React$Element<any> {
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
