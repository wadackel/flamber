/* eslint-disable */
import React, { Component, PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Avatar,
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
  RandomGridIcon,
  GridIcon,
  ListIcon
} from "../../svg-icons/";

const b = bem("header");

export default class Header extends Component {
  static propTypes = {
    navItems: PropTypes.node,
    onLogoClick: PropTypes.func,
    onSettingsClick: PropTypes.func
  };

  static defaultProps = {
    onLogoClick: () => {},
    onSettingsClick: () => {}
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
      navItems,
      onLogoClick,
      onSettingsClick
    } = this.props;

    const {
      userDropDownOpen,
      userDropDownTrigger
    } = this.state;

    return (
      <header className={b()}>
        <div className={b("row", { main: true })}>
          <div className={b("col", { "main-left": true })}>
            <h1 className={b("logo")}><LogoButton onClick={onLogoClick} /></h1>
            <Nav className={b("nav")}>
              {navItems}
            </Nav>
          </div>
          <div className={b("col", { "main-center": true })}>
            <EditableText
              className={b("main-title")}
              icon={<PencilIcon />}
              value="Web Application"
            />
          </div>
          <div className={b("col", { "main-right": true })}>
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
              <IconButton icon={<CogIcon />} onClick={onSettingsClick} />
            </div>
          </div>
        </div>

        <div className={b("row", { sub: true })}>
          <div className={b("col", { "sub-left": true })}>
            <IconButton icon={<TagsIcon />} />
            <IconButton icon={<StarIcon />} />
            <SearchField
              className={b("search-field")}
              placeholder="Type search keyword"
            />
          </div>
          <div className={b("col", { "sub-center": true })}>
            <h3 className={b("sub-title")}>Total 102 items</h3>
          </div>
          <div className={b("col", { "sub-right": true })}>
            <Slider
              className={b("layout-slider")}
              defaultValue={50}
            />
            <LayoutButtonGroup
              className={b("layout-group")}
              value={Layout.GRID}
            >
              <LayoutButton icon={<RandomGridIcon />} value={Layout.RANDOM_GRID}></LayoutButton>
              <LayoutButton icon={<GridIcon />} value={Layout.GRID}></LayoutButton>
              <LayoutButton icon={<ListIcon />} value={Layout.LIST}></LayoutButton>
            </LayoutButtonGroup>
          </div>
        </div>
      </header>
    );
  }
}
