import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as NotificationActions from "../../../actions/notifications";
import bindHandlers from "../../../helpers/bind-handlers";
import { Snackbar } from "../../../components/ui/";

export class NotificationsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    notifications: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleClose",
      "handleActionClick"
    ], this);
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
      message: message || ""
    };

    if (action) {
      props.action = action.text;
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
  state => ({
    notifications: state.notifications
  }),
  null,
  null,
  { pure: false }
)(NotificationsContainer);
