// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { FlatButton, IconButton } from "../";
import { CloseIcon } from "../../svg-icons/";

const b = bem("snackbar");

type Props = {
  className?: string;
  open: boolean;
  hideDuration: number;
  message: React$Element<any>;
  action: React$Element<any>;
  onActionClick?: Function;
  onRequestClose?: Function;
};

export default class Snackbar extends Component {
  props: Props;

  static defaultProps = {
    open: false,
    hideDuration: 6000,
    onActionClick: () => {},
    onRequestClose: () => {}
  };

  timer: number = 0;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.open !== this.props.open && nextProps.open) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.handleTimeout,
        nextProps.hideDuration || this.props.hideDuration
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleActionClick = (e: SyntheticMouseEvent) => {
    if (typeof this.props.onActionClick === "function") {
      this.props.onActionClick(e);
    }
  }

  handleTimeout = (): void => {
    this.requestClose();
  }

  handleCloseClick = (): void => {
    this.requestClose();
  }

  requestClose = (): void => {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  render() {
    const {
      className,
      open,
      message,
      action
    } = this.props;

    const modifier = { open };

    const actionElement = action
      ? <FlatButton
          className={b("action", modifier)()}
          type="primary"
          onClick={this.handleActionClick}
        >
          {action}
        </FlatButton>
      : null;

    return (
      <div className={mergeClassNames(b(modifier)(), className)}>
        <div className={b("horizontal", modifier)()}>
          <div className={b("vertical", modifier)()}>
            <div className={b("body", modifier)()}>
              <span className={b("message")()}>{message}</span>
              {actionElement}
              <IconButton
                className={b("close", modifier)()}
                icon={<CloseIcon />}
                onClick={this.handleCloseClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
