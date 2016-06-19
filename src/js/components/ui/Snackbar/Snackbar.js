import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import { FlatButton } from "../";

const b = bem("snackbar");

export default class Snackbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    hideDuration: PropTypes.number,
    message: PropTypes.node.isRequired,
    action: PropTypes.node,
    onActionClick: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    open: false,
    hideDuration: 6000,
    onActionClick: () => {},
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleActionClick",
      "handleTimeout"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
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

  handleActionClick(e) {
    this.props.onActionClick(e);
  }

  handleTimeout() {
    this.props.onRequestClose();
  }

  render() {
    const {
      className,
      open,
      message,
      action
    } = this.props;

    const modifier = {
      open
    };

    const actionElement = action
      ? <FlatButton
          className={b("action", modifier)}
          type="primary"
          onClick={this.handleActionClick}
        >
          {action}
        </FlatButton>
      : null;

    return (
      <div className={mergeClassNames(b(modifier), className)}>
        <div className={b("horizontal", modifier)}>
          <div className={b("vertical", modifier)}>
            <div className={b("body", modifier)}>
              <span className={b("message")}>{message}</span>
              {actionElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
