// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import { connect } from "react-redux";
import bem from "../../../../helpers/bem";
import { LocalNav, LocalNavItem } from "../../../../components/ui/";

const b = bem("options-page");

// TODO: type definition
type Props = {
  children: React$Element<any>;
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
    // TODO
  }

  render() {
    const { children } = this.props;

    return (
      <div className={b()}>
        <div className={b("sidebar")()}>
          <LocalNav
            className={b("nav")()}
            onItemClick={this.handleItemClick}
          >
            <LocalNavItem href="/app/">プロフィール</LocalNavItem>
            <LocalNavItem href="/app/account">アカウント</LocalNavItem>
            <LocalNavItem href="/app/feed">フィード設定</LocalNavItem>
            <LocalNavItem href="/help" target="_blank">ヘルプ</LocalNavItem>
            <LocalNavItem href="/privacy" target="_blank">プライバシーポリシー</LocalNavItem>
            <LocalNavItem href="/terms" target="_blank">利用規約</LocalNavItem>
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
