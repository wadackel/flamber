// @flow
import React, { Component, PropTypes } from "react";
import * as Themes from "../../../constants/themes";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Dialog } from "../";

const b = bem("alert-dialog");

type Props = {
  children?: React$Element<any>;
  className?: string;
  processing: boolean;
  title: React$Element<any>;
  actions: React$Element<any>;
  open: boolean;
};

export default class AlertDialog extends Component {
  props: Props;

  static defaultProps = {
    processing: false,
    open: false
  };

  static childContextTypes = {
    theme: PropTypes.string.isRequired
  };

  getChildContext() {
    return {
      theme: Themes.LIGHT
    };
  }

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
      {title && <div className={b("title")()}>{title}</div>}
      <div className={b("body")()}>{children}</div>
    </Dialog>;
  }
}
