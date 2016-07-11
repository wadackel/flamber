/* eslint-disable */
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Avatar,
  UserDropDown,
  IconButton
} from "../";
import {
  CogIcon,
  LogoIcon
} from "../../svg-icons/";

const b = bem("header");

export default class Header extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      userDropDownOpen: false,
      userDropDownTrigger: null
    };

    bindHandlers([
      "handleUserDropDownClick",
      "handleUserDropDownRequestClose",
      "handleSignOut"
    ], this);
  }

  handleUserDropDownClick(e) {
    this.setState({
      userDropDownOpen: !this.state.userDropDownOpen,
      userDropDownTrigger: e.currentTarget
    });
  }

  handleUserDropDownRequestClose() {
    this.setState({
      userDropDownOpen: false
    });
  }

  handleSignOut() {
    // TODO
  }

  render() {
    const {
      userDropDownOpen,
      userDropDownTrigger
    } = this.state;

    return (
      <header className={b()}>
        <div className={b("row", { main: true })}>
          <div className={b("col", { "top-left": true })}>
            <h1 className={b("logo")}><a href="#"><LogoIcon /></a></h1>
            <nav className={b("nav")}>
              <ul className={b("nav__list")}>
                <li className={b("nav__item", { active: true })}><a href="#">My items</a></li>
                <li className={b("nav__item")}><a href="#">Feed</a></li>
              </ul>
            </nav>
          </div>
          <div className={b("col", { "top-center": true })}>
            <h2 className={b("main-title")}>Web Application</h2>
          </div>
          <div className={b("col", { "top-right": true })}>
            <div className={b("user")}>
              <Avatar
                className={b("user__avatar")}
                name="wadackel"
                email="mail@example.com"
                icon="/images/avatar-sample.png"
                onIconClick={this.handleUserDropDownClick}
              />
              <UserDropDown
                className={b("user__drop-down")}
                open={userDropDownOpen}
                triggerElement={userDropDownTrigger}
                limit={16106127360}
                usage={2195751968}
                onRequestClose={this.handleUserDropDownRequestClose}
                onRequestSignOut={this.handleSignOut}
              />
            </div>
            <div className={b("setting")}>
              <IconButton icon={<CogIcon />} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
