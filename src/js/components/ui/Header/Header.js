// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import {
  Avatar,
  LogoButton,
  UserDropDown,
  Nav,
  ColorBar
} from "../";
import { ITEM_UPLOAD_LIMIT } from "../../../constants/application";
import type { User } from "../../../types/user";

const b = bem("header");

type Props = {
  user: User;
  colors: Array<string>;
  navItems: React$Element<any>;
  mainTitle: React$Element<any>;
  subTitle: React$Element<any>;
  subLeft: React$Element<any>;
  subRight: React$Element<any>;
  onLogoClick?: Function;
  onOptionsClick?: Function;
  onSignOutClick?: Function;
};

type State = {
  userDropDownOpen: boolean;
  userDropDownTrigger: ?HTMLElement;
};

export default class Header extends Component {
  props: Props;
  state: State = {
    userDropDownOpen: false,
    userDropDownTrigger: null
  };

  static defaultProps = {
    colors: []
  };

  handleUserDropDownClick = (e: SyntheticMouseEvent) => {
    this.setState({
      userDropDownOpen: !this.state.userDropDownOpen,
      userDropDownTrigger: e.currentTarget instanceof HTMLElement ? e.currentTarget : null
    });
  }

  handleUserDropDownRequestClose = () => {
    this.userDropDownClose();
  }

  handleSignOut = () => {
    this.userDropDownClose(() => {
      if (typeof this.props.onSignOutClick === "function") {
        this.props.onSignOutClick();
      }
    });
  }

  handleOptionsClick = () => {
    this.userDropDownClose(() => {
      if (typeof this.props.onOptionsClick === "function") {
        this.props.onOptionsClick();
      }
    });
  }

  userDropDownClose(callback?: Function): void {
    this.setState({ userDropDownOpen: false }, callback);
  }

  renderSubHeader(): ?React$Element<any> {
    const {
      subTitle,
      subLeft,
      subRight
    } = this.props;

    if (!subTitle && !subLeft && !subRight) return null;

    return (
      <div className={b("row", { sub: true })()}>
        {subLeft && <div className={b("col", { "sub-left": true })()}>
          {subLeft}
        </div>}
        {subTitle && <div className={b("col", { "sub-center": true })()}>
          <h3 className={b("sub-title")()}>{subTitle}</h3>
        </div>}
        {subRight && <div className={b("col", { "sub-right": true })()}>
          {subRight}
        </div>}
      </div>
    );
  }

  render() {
    const {
      user,
      colors,
      navItems,
      mainTitle,
      onLogoClick
    } = this.props;

    const {
      userDropDownOpen,
      userDropDownTrigger
    } = this.state;

    const navItemElements = React.Children.map(navItems, (item, index) =>
      React.cloneElement(item, { key: index })
    );

    return (
      <header className={b()}>
        <div className={b("body")()}>
          <div className={b("row", { main: true })()}>
            <div className={b("col", { "main-left": true })()}>
              <h1 className={b("logo")()}><LogoButton onClick={onLogoClick} /></h1>
              <Nav className={b("nav")()}>
                {navItemElements}
              </Nav>
            </div>
            {mainTitle && <div className={b("col", { "main-center": true })()}>
              <div className={b("main-title")()}>
                {mainTitle}
              </div>
            </div>}
            <div className={b("col", { "main-right": true })()}>
              <div className={b("user")()}>
                {user &&
                  <Avatar
                    className={b("user__avatar")()}
                    primary={user.name}
                    secondary={`Sign in from ${user.provider}`}
                    icon={user.photo}
                    onIconClick={this.handleUserDropDownClick}
                  />
                }
                {user &&
                  <UserDropDown
                    className={b("user__drop-down")()}
                    open={userDropDownOpen}
                    triggerElement={userDropDownTrigger}
                    limit={ITEM_UPLOAD_LIMIT}
                    usage={user.today_upload}
                    onRequestClose={this.handleUserDropDownRequestClose}
                    onRequestSignOut={this.handleSignOut}
                    onRequestOptions={this.handleOptionsClick}
                  />
                }
              </div>
            </div>
          </div>

          {this.renderSubHeader()}
        </div>

        <ColorBar
          className={b("color-bar", { show: colors.length > 0 })()}
          lineWidth={2}
          palette={colors}
        />
      </header>
    );
  }
}
