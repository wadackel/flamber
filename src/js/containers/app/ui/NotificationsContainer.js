// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as NotificationActions from "../../../actions/notifications";
import { Snackbar } from "../../../components/ui/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { NotificationState } from "../../../types/notification";

type Props = {
  dispatch: Dispatch;
  notifications: NotificationState;
};

export class NotificationsContainer extends Component {
  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleClose() {
    this.props.dispatch(NotificationActions.hideNotify());
  }

  handleActionClick() {
    this.props.dispatch(NotificationActions.notifyAction());
  }

  render() {
    const { notifications: { message, action } } = this.props;
    const props = {
      open: !!message,
      onRequestClose: this.handleClose,
      message: message || "",
      action: null,
      onActionClick: () => {}
    };

    if (action) {
      props.action = action.payload.text;
      props.onActionClick = this.handleActionClick;
    }

    return (
      <Snackbar
        {...props}
      />
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    notifications: state.notifications
  })
)(NotificationsContainer);
