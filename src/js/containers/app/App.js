/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as Layout from "../../constants/layouts";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  AddBoardDialog,
  FloatingMenu,
  FloatingButton,
  Header,
  EditableText,
  NavItem,
  IconButton,
  LayoutButtonGroup,
  LayoutButton,
  SearchField,
  Slider,
} from "../../components/ui/";
import {
  BoardIcon,
  PictureLinkIcon,
  UploadIcon,
  TagsIcon,
  StarIcon,
  PencilIcon,
  RandomGridIcon,
  GridIcon,
  ListIcon
} from "../../components/svg-icons/";

const NavItemActive = {
  MY_ITEMS: "MY_ITEMS",
  FEEDS: "FEEDS"
};

const b = bem("app");

export class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      addBoardDialogOpen: false
    };

    bindHandlers([
      "handleMyItemsClick",
      "handleFeedsClick",
      "handleLogoClick",
      "handleSettingsClick",
      "handleAddBoardOpen",
      "handleAddBoardClose",
      "handleAddBoard",
      "handleAddLinkItemOpen",
      "handleAddItemOpen"
    ], this);
  }

  handleMyItemsClick() {
    this.push("/app/");
  }

  handleFeedsClick() {
    this.push("/app/feeds");
  }

  handleLogoClick() {
    this.push("/app/");
  }

  handleSettingsClick() {
    this.push("/app/settings");
  }

  handleAddBoardOpen() {
    this.setState({ addBoardDialogOpen: true });
  }

  handleAddBoardClose() {
    this.setState({ addBoardDialogOpen: false });
  }

  handleAddBoard(boardName) {
    console.log(`TODO: ${boardName}`);
  }

  handleAddLinkItemOpen() {
    // TODO
  }

  handleAddItemOpen() {
    // TODO
  }

  push(path) {
    this.props.dispatch(push(path));
  }

  getHeaderBoardsProps() {
    return {
      activeNavItem: NavItemActive.MY_ITEMS,
      mainTitle: (
        <EditableText
          icon={<PencilIcon />}
          value="Web Application"
        />
      ),
      subLeft: (
        <div>
          <IconButton icon={<TagsIcon />} />
          <IconButton icon={<StarIcon />} />
          <SearchField
            placeholder="Type search keyword"
          />
        </div>
      ),
      subRight: (
        <div>
          <Slider
            defaultValue={50}
          />
          <LayoutButtonGroup
            value={Layout.GRID}
          >
            <LayoutButton icon={<RandomGridIcon />} value={Layout.RANDOM_GRID}></LayoutButton>
            <LayoutButton icon={<GridIcon />} value={Layout.GRID}></LayoutButton>
            <LayoutButton icon={<ListIcon />} value={Layout.LIST}></LayoutButton>
          </LayoutButtonGroup>
        </div>
      )
    };
  }

  getHeaderFeedsProps() {
    return {
      activeNavItem: NavItemActive.FEEDS
      /* TODO */
    };
  }

  getHeaderSettingsProps() {
    return {
      mainTitle: <span>Settings</span>
    };
  }

  getHeader404Props() {
    return {/* TODO */};
  }

  getHeaderProps() {
    const { location: { pathname } } = this.props;
    const methodMaps = [
      { method: this.getHeaderBoardsProps, regex: /^\/app\/?(boards\/?.*)?$/ },
      { method: this.getHeaderFeedsProps, regex: /^\/app\/feeds\/?.*$/ },
      { method: this.getHeaderSettingsProps, regex: /^\/app\/settings\/?.*$/ },
      { method: this.getHeader404Props, regex: /^.*$/ }
    ];

    const res = methodMaps.filter(obj =>
      obj.regex.test(pathname)
    ).shift();

    return res.method();
  }

  render() {
    const {
      auth: { user }
    } = this.props;

    const {
      addBoardDialogOpen
    } = this.state;

    const {
      activeNavItem,
      ...headerProps
    } = this.getHeaderProps();

    return (
      <div className={b()}>
        {/* Header */}
        <Header
          user={user}
          navItems={[
            <NavItem onClick={this.handleMyItemsClick} active={activeNavItem === NavItemActive.MY_ITEMS}>My Items</NavItem>,
            <NavItem onClick={this.handleFeedsClick} acive={activeNavItem === NavItemActive.FEEDS}>Feeds</NavItem>
          ]}
          onLogoClick={this.handleLogoClick}
          onSettingsClick={this.handleSettingsClick}
          {...headerProps}
        />

        {/* Content */}
        <div className={b("content")}>
          {this.props.children}
        </div>

        {/* Menu */}
        <FloatingMenu className={b("floating-menu")}>
          <FloatingButton type="primary" icon={<BoardIcon />} onClick={this.handleAddBoardOpen} />
          <FloatingButton type="primary" icon={<PictureLinkIcon />} onClick={this.handleAddLinkItemOpen} />
          <FloatingButton type="primary" icon={<BoardIcon />} onClick={this.handleAddItemOpen} />
        </FloatingMenu>

        {/* Add board */}
        <AddBoardDialog
          open={addBoardDialogOpen}
          onRequestClose={this.handleAddBoardClose}
          onRequestAdd={this.handleAddBoard}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings
  }),
  null,
  null,
  { pure: false }
)(App);
