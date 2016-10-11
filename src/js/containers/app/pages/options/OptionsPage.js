// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../../../helpers/bem";
import { LocalNav, LocalNavItem } from "../../../../components/ui/";

const b = bem("options-page");

// TODO: type definition
type Props = {
  children: React$Element<any>;
  dispatch: Function;
  location: {
    pathname: string;
  }
};

type State = {
  auth: any;
  settings: any;
};

export class OptionsPage extends Component {
  props: Props;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleItemClick(href: string, target: string) {
    if (target === "_blank") {
      window.open().location.href = href;
    } else {
      this.props.dispatch(push(href));
    }
  }

  render() {
    const { children, location } = this.props;

    return (
      <div className={`container ${b()}`}>
        <div className={b("sidebar")()}>
          <LocalNav
            className={b("nav")()}
            href={location.pathname}
            onItemClick={this.handleItemClick}
          >
            <LocalNavItem href="/app/options/">プロフィール</LocalNavItem>
            <LocalNavItem href="/app/options/account/">アカウント</LocalNavItem>
            <LocalNavItem href="/app/options/feed/">フィード設定</LocalNavItem>
            <LocalNavItem href="/help/" target="_blank">ヘルプ</LocalNavItem>
            <LocalNavItem href="/privacy/" target="_blank">プライバシーポリシー</LocalNavItem>
            <LocalNavItem href="/terms/" target="_blank">利用規約</LocalNavItem>
          </LocalNav>
        </div>
        <div className={b("content")()}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    auth: state.auth,
    settings: state.settings
  }),
  null,
  null,
  { pure: false }
)(OptionsPage);
