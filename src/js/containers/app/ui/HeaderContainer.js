/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import deepEqual from "deep-equal";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import MDSpinner from "react-md-spinner";
import * as Layout from "../../../constants/layouts";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as TagActions from "../../../actions/tags";
import { getCurrentBoard, getSelectedBoardEntities } from "../../../selectors/boards";
import { getSelectedItemEntities } from "../../../selectors/items";
import {
  Header,
  EditableText,
  NavItem,
  IconButton,
  LayoutButtonGroup,
  LayoutButton,
  SearchField,
  Slider
} from "../../../components/ui/";
import {
  TagsIcon,
  StarIcon,
  PencilIcon,
  RandomGridIcon,
  GridIcon,
  ListIcon
} from "../../../components/svg-icons/";

const NavItemActive = {
  MY_ITEMS: "MY_ITEMS",
  FEEDS: "FEEDS"
};

export class HeaderContainer extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      boardName: "",
      itemsSize: props.settings.itemsSize
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (
      nextProps.currentBoard
      && !nextProps.currentBoard.isUpdating
      && !deepEqual(props.currentBoard, nextProps.currentBoard)
    ) {
      this.setState({ boardName: nextProps.currentBoard.name });
    }
  }

  // Navigation
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

  handleTagDrawerToggle() {
    this.props.dispatch(TagActions.tagDrawerToggle());
  }

  // Update board
  handleBoardNameChange(e, value) {
    this.setState({ boardName: value });
  }

  handleBoardNameComplete(name) {
    const { currentBoard } = this.props;
    const board = {
      ...currentBoard,
      name
    };

    this.props.dispatch(BoardActions.updateBoardIfNeeded(board));
  }

  // Update layouts
  handleBoardsLayoutChange(layout) {
    this.props.dispatch(SettingActions.updateBoardsLayoutRequest(layout));
  }

  handleItemsLayoutChange(layout) {
    this.props.dispatch(SettingActions.updateItemsLayoutRequest(layout));
  }

  handleItemsSizeChange(size) {
    this.setState({
      itemsSize: size
    });

    this.props.dispatch(SettingActions.updateItemsSizeRequestDebounce(size));
  }

  // Header props
  getHeaderMyItemsSubLeft() {
    return (
      <div>
        <IconButton
          icon={<TagsIcon />}
          tooltip="タグ"
          onClick={this.handleTagDrawerToggle}
        />
        <IconButton
          icon={<StarIcon />}
          tooltip="スター付きアイテム"
        />
        <SearchField
          placeholder="Type search keyword"
        />
      </div>
    );
  }

  getHeaderBoardsProps() {
    const {
      selectedBoardEntities,
      settings: { boardsLayout }
    } = this.props;

    const hasSelectedBoard = selectedBoardEntities.length > 0;

    return {
      activeNavItem: NavItemActive.MY_ITEMS,
      subLeft: this.getHeaderMyItemsSubLeft(),
      subRight: (
        <div style={{ display: hasSelectedBoard ? "none" : "block" }}>
          <LayoutButtonGroup
            value={boardsLayout}
            onChange={this.handleBoardsLayoutChange}
          >
            <LayoutButton
              icon={<GridIcon />}
              value={Layout.GRID}
              tooltip="グリッド"
            />
            <LayoutButton
              icon={<ListIcon />}
              value={Layout.LIST}
              tooltip="リスト"
            />
          </LayoutButtonGroup>
        </div>
      )
    };
  }

  getHeaderBoardDetailProps() {
    const {
      boards,
      currentBoard,
      items,
      selectedItemEntities,
      settings: { itemsLayout }
    } = this.props;

    const { boardName, itemsSize } = this.state;
    const hasSelectedItem = selectedItemEntities.length > 0;

    return {
      activeNavItem: NavItemActive.MY_ITEMS,
      mainTitle: currentBoard && (
        <div>
          <EditableText
            icon={<PencilIcon />}
            value={boardName}
            onChange={this.handleBoardNameChange}
            onComplete={this.handleBoardNameComplete}
          />
          <MDSpinner
            size={20}
            style={{
              visibility: currentBoard.isUpdating ? "visible" : "hidden",
              marginLeft: 10
            }}
          />
        </div>
      ),
      subLeft: this.getHeaderMyItemsSubLeft(),
      subTitle: currentBoard && (
        <div>Total {currentBoard.items.length} items</div>
      ),
      subRight: (
        <div style={{ display: hasSelectedItem ? "none" : "block" }}>
          {itemsLayout !== Layout.LIST && <Slider
            min={140}
            max={400}
            value={itemsSize}
            onChange={this.handleItemsSizeChange}
          />}
          <LayoutButtonGroup
            value={itemsLayout}
            onChange={this.handleItemsLayoutChange}
          >
            <LayoutButton
              icon={<RandomGridIcon />}
              value={Layout.RANDOM_GRID}
              tooltip="Pinterest"
            />
            <LayoutButton
              icon={<GridIcon />}
              value={Layout.GRID}
              tooltip="グリッド"
            />
            <LayoutButton
              icon={<ListIcon />}
              value={Layout.LIST}
              tooltip="リスト"
            />
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

  // TODO: Branch in name of child container component
  getHeaderProps() {
    const { location: { pathname } } = this.props;
    const methodMaps = [
      { method: this.getHeaderBoardsProps, regex: /^\/app\/?(boards\/?.*)?$/ },
      { method: this.getHeaderBoardDetailProps, regex: /^\/app\/board\/(.+)$/ },
      { method: this.getHeaderFeedsProps, regex: /^\/app\/feeds\/?.*$/ },
      { method: this.getHeaderSettingsProps, regex: /^\/app\/settings\/?.*$/ },
      { method: this.getHeader404Props, regex: /^.*$/ }
    ];

    const res = methodMaps.filter(obj =>
      obj.regex.test(pathname)
    ).shift();

    return res.method.call(this);
  }

  push(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const { auth: { user } } = this.props;

    const {
      activeNavItem,
      ...headerProps
    } = this.getHeaderProps();

    return (
      <Header
        user={user}
        navItems={[
          <NavItem
            onClick={this.handleMyItemsClick}
            active={activeNavItem === NavItemActive.MY_ITEMS}
          >
            My Items
          </NavItem>,
          <NavItem
            onClick={this.handleFeedsClick}
            acive={activeNavItem === NavItemActive.FEEDS}
          >
            Feeds
          </NavItem>
        ]}
        onLogoClick={this.handleLogoClick}
        onSettingsClick={this.handleSettingsClick}
        {...headerProps}
      />
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings,
    boards: state.boards,
    selectedBoardEntities: getSelectedBoardEntities(state),
    currentBoard: getCurrentBoard(state),
    items: state.items,
    selectedItemEntities: getSelectedItemEntities(state)
  }),
  null,
  null,
  { pure: false }
)(HeaderContainer);
