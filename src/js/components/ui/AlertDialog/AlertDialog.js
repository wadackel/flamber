import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Dialog } from "../";

const b = bem("alert-dialog");

export default class AlertDialog extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    processing: PropTypes.bool,
    title: PropTypes.node,
    actions: PropTypes.node,
    open: PropTypes.bool
  };

  static defaultProps = {
    processing: false,
    open: false
  };

  render() {
    const {
      children,
      className,
      title, // eslint-disable-line no-unused-vars
      actions,
      open,
      processing
    } = this.props;

    return <Dialog
      className={mergeClassNames(b(), className)}
      open={open}
      processing={processing}
      actions={actions}
    >
      {title && <div className={b("title")}>{title}</div>}
      <div className={b("body")}>{children}</div>
    </Dialog>;
  }
}
