/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import palette from "../../../constants/palette";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import {
  Avatar,
  ColorBar,
  LogoButton,
  EditableText,
  UserDropDown,
  Nav,
  IconButton,
  LayoutButtonGroup,
  LayoutButton,
  SearchField,
  Slider
} from "../";
import {
  TagsIcon,
  StarIcon,
  CogIcon,
  LogoIcon,
  PencilIcon,
  GalleryIcon,
  GridIcon,
  ListIcon
} from "../../svg-icons/";

const b = bem("header");

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    showColorBar: PropTypes.bool,
    color: PropTypes.string,
    navItems: PropTypes.node,
    mainTitle: PropTypes.node,
    subTitle: PropTypes.node,
    subLeft: PropTypes.node,
    subRight: PropTypes.node,
    onLogoClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    onColorChange: PropTypes.func
  };

  static defaultProps = {
    showColorBar: false,
    onLogoClick: () => {},
    onSettingsClick: () => {},
    onColorChange: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      userDropDownOpen: false,
      userDropDownTrigger: null
    };

    autoBind(this);
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

  handleColorChange(color) {
    this.props.onColorChange(color);
  }

  renderSubHeader() {
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
      showColorBar,
      color,
      navItems,
      mainTitle,
      onLogoClick,
      onSettingsClick
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
                <Avatar
                  className={b("user__avatar")()}
                  name={user.name}
                  email={user.email}
                  icon={user.icon}
                  onIconClick={this.handleUserDropDownClick}
                />
                <UserDropDown
                  className={b("user__drop-down")()}
                  open={userDropDownOpen}
                  triggerElement={userDropDownTrigger}
                  limit={parseInt(user.limit, 10)}
                  usage={parseInt(user.usage, 10)}
                  onRequestClose={this.handleUserDropDownRequestClose}
                  onRequestSignOut={this.handleSignOut}
                />
              </div>
              <div className={b("setting")()}>
                <IconButton icon={<CogIcon />} onClick={onSettingsClick} />
              </div>
            </div>
          </div>

          {this.renderSubHeader()}
        </div>

        <ColorBar
          className={b("colorbar", { show: showColorBar })()}
          palette={palette}
          color={color}
          onChange={this.handleColorChange}
        />
      </header>
    );
  }
}
