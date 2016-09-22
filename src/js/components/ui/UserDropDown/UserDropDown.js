import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import * as OriginPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Popover,
  UploadStatus,
  FlatButton
} from "../";

const b = bem("user-drop-down");

export default class UserDropDown extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    limit: PropTypes.number,
    usage: PropTypes.number,
    triggerElement: PropTypes.object,
    triggerOrigin: OriginPropTypes.origin,
    onRequestSignOut: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    triggerOrigin: {
      vertical: "bottom",
      horizontal: "right"
    },
    onRequestSignOut: () => {},
    onRequestClose: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleRequestClose() {
    this.props.onRequestClose();
  }

  handleSignOutClick() {
    this.props.onRequestSignOut();
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
              className={b("sign-out")()}
              onClick={this.handleSignOutClick}
            >
              SignOut
            </FlatButton>
          </div>
        </div>
      </Popover>
    );
  }
}
