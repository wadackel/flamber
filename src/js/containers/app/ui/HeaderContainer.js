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
import * as ItemActions from "../../../actions/items";
import * as TagActions from "../../../actions/tags";
import { getCurrentBoard, getSelectedBoardEntities } from "../../../selectors/boards";
import { getSelectedItemEntities } from "../../../selectors/items";
import { AllItemsPage } from "../pages/AllItemsPage";
import { BoardsPage } from "../pages/BoardsPage";
import { BoardDetailPage } from "../pages/BoardDetailPage";
import { SettingsPage } from "../pages/SettingsPage";
import { StarsPage } from "../pages/StarsPage";
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
  GalleryIcon,
  GridIcon,
  ListIcon
} from "../../../components/svg-icons/";

const NavItemActive = {
  BOARDS: "BOARDS",
  ALL_ITEMS: "ALL_ITEMS",
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
  handleBoardsClick() {
    this.push("/app/");
  }

  handleAllItemsClick() {
    this.push("/app/items");
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

  handleStarClick() {
    this.push("/app/stars");
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

  // Update currentColor
  handleColorChange(color) {
    this.props.dispatch(ItemActions.setItemCurrentColor(color));
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
          onClick={this.handleStarClick}
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
      activeNavItem: NavItemActive.BOARDS,
      showColorBar: false,
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

  getHeaderBoardDetailProps(activeNavItem) {
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
      activeNavItem,
      showColorBar: true,
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
              icon={<GalleryIcon />}
              value={Layout.GALLERY}
              tooltip="ギャラリー表示"
            />
            <LayoutButton
              icon={<GridIcon />}
              value={Layout.GRID}
              tooltip="グリッド表示"
            />
            <LayoutButton
              icon={<ListIcon />}
              value={Layout.LIST}
              tooltip="リスト表示"
            />
          </LayoutButtonGroup>
        </div>
      )
    };
  }

  getHeaderFeedsProps() {
    return {
      activeNavItem: NavItemActive.FEEDS,
      showColorBar: false
      /* TODO */
    };
  }

  getHeaderSettingsProps() {
    return {
      mainTitle: <span>Settings</span>,
      showColorBar: false
    };
  }

  getHeader404Props() {
    return {/* TODO */};
  }

  getHeaderProps() {
    const { routes } = this.props;
    const currentComponent = routes[routes.length - 1].component.WrappedComponent;

    switch (currentComponent) {
      case BoardsPage:
        return this.getHeaderBoardsProps();

      case BoardDetailPage:
        return this.getHeaderBoardDetailProps(NavItemActive.BOARDS);

      case AllItemsPage:
        return this.getHeaderBoardDetailProps(NavItemActive.ALL_ITEMS);

      case StarsPage:
        return this.getHeaderBoardDetailProps();

      case SettingsPage:
        return this.getHeaderSettingsProps();

      default:
        return this.getHeader404Props();
    }
  }

  push(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const {
      auth: { user },
      items
    } = this.props;

    const {
      activeNavItem,
      showColorBar,
      ...headerProps
    } = this.getHeaderProps();

    return (
      <Header
        user={user}
        showColorBar={showColorBar}
        color={items.currentColor}
        navItems={[
          <NavItem
            active={activeNavItem === NavItemActive.BOARDS}
            onClick={this.handleBoardsClick}
          >
            Boards
          </NavItem>,
          <NavItem
            active={activeNavItem === NavItemActive.ALL_ITEMS}
            onClick={this.handleAllItemsClick}
          >
            All Items
          </NavItem>,
          <NavItem
            acive={activeNavItem === NavItemActive.FEEDS}
            onClick={this.handleFeedsClick}
          >
            Feeds
          </NavItem>
        ]}
        onLogoClick={this.handleLogoClick}
        onSettingsClick={this.handleSettingsClick}
        onColorChange={this.handleColorChange}
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
