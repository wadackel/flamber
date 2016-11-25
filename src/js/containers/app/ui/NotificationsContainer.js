// @flow
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
  props: Props;

  handleClose = () => {
    this.props.dispatch(NotificationActions.hideNotify());
  }

  handleActionClick = () => {
    this.props.dispatch(NotificationActions.notifyAction());
  }

  render() {
    const { notifications: { message, action } } = this.props;
    let props = {
      open: !!message,
      onRequestClose: this.handleClose,
      message: message || ""
    };

    if (action) {
      props = {
        ...props,
        action: action.payload.text,
        onActionClick: this.handleActionClick
      };
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
