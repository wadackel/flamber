// @flow
import autoBind from "auto-bind";
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Popover,
  UploadStatus,
  FlatButton
} from "../";
import type { Origin } from "../../../types/prop-types";

const b = bem("user-drop-down");

type Props = {
  className?: string;
  open: boolean;
  limit: number;
  usage: number;
  triggerElement: ?HTMLElement;
  triggerOrigin: Origin;
  onRequestOptions?: Function;
  onRequestSignOut?: Function;
  onRequestClose?: Function;
};

export default class UserDropDown extends React.Component {
  props: Props;

  static defaultProps = {
    open: false,
    triggerOrigin: {
      vertical: "bottom",
      horizontal: "right"
    }
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleRequestClose() {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  handleOptionsClick() {
    if (typeof this.props.onRequestOptions === "function") {
      this.props.onRequestOptions();
    }
  }

  handleSignOutClick() {
    if (typeof this.props.onRequestSignOut === "function") {
      this.props.onRequestSignOut();
    }
  }

  render() {
    const {
      className,
      open,
      limit,
      usage,
      triggerElement,
      triggerOrigin
    } = this.props;

    return (
      <Popover
        open={open}
        origin={{
          vertical: "top",
          horizontal: "right"
        }}
        triggerElement={triggerElement}
        triggerOrigin={triggerOrigin}
        onRequestClose={this.handleRequestClose}
      >
        <div className={mergeClassNames(b(), className)}>
          <UploadStatus
            className={b("status")()}
            limit={limit}
            usage={usage}
          />
          <div className={b("footer")()}>
            <FlatButton
              className={b("action")()}
              onClick={this.handleOptionsClick}
            >
              オプション
            </FlatButton>
            <FlatButton
              className={b("action")()}
              onClick={this.handleSignOutClick}
            >
              ログアウト
            </FlatButton>
          </div>
        </div>
      </Popover>
    );
  }
}
