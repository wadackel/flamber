// @flow
import autoBind from "auto-bind";
import deepEqual from "deep-equal";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as AuthActions from "../../../actions/auth";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import * as TagActions from "../../../actions/tags";
import { getCurrentBoard, getSelectedBoardEntities } from "../../../selectors/boards";
import { getSelectedItemEntities } from "../../../selectors/items";
import {
  Header,
  CancelableEditText,
  NavItem,
  IconButton,
  LayoutButtonGroup,
  LayoutButton,
  SearchField,
  Slider,
  Spinner
} from "../../../components/ui/";
import {
  TagsIcon,
  StarIcon,
  PencilIcon,
  GalleryIcon,
  GridIcon,
  ListIcon
} from "../../../components/svg-icons/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { AuthState } from "../../../types/auth";
import type { BoardState, BoardEntity, BoardEntities } from "../../../types/board";
import type { ItemState, ItemEntities } from "../../../types/item";
import type { Layout } from "../../../types/prop-types";


type Props = {
  dispatch: Dispatch;
  routes: any;
  auth: AuthState;
  boards: BoardState;
  selectedBoardEntities: BoardEntities;
  currentBoard: ?BoardEntity;
  items: ItemState;
  selectedItemEntities: ItemEntities;
};

type State = {
  boardName: string;
  itemsSize: number;
};

const NavItemActive = {
  BOARDS: "BOARDS",
  ALL_ITEMS: "ALL_ITEMS",
  FEEDS: "FEEDS"
};

export class HeaderContainer extends Component {
  props: Props;
  state: State;

  constructor(props: Props, context: Object) {
    super(props, context);

    // TODO
    this.state = {
      boardName: "",
      itemsSize: 180
      // itemsSize: props.settings.itemsSize
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;

    if (
      nextProps.currentBoard &&
      !nextProps.currentBoard.isUpdating &&
      !deepEqual(props.currentBoard, nextProps.currentBoard)
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

  handleOptionsClick() {
    this.push("/app/options/");
  }

  handleTagDrawerToggle() {
    this.props.dispatch(TagActions.tagDrawerToggle());
  }

  handleStarClick() {
    this.push("/app/stars");
  }

  handleSignOut() {
    this.props.dispatch(AuthActions.signOutRequest());
  }

  // Update board
  handleBoardNameComplete(name: string) {
    const { currentBoard } = this.props;
    const board: BoardEntity = {
      ...currentBoard,
      name
    };

    this.props.dispatch(BoardActions.updateBoardIfNeeded(board));
    this.setState({ boardName: name });
  }

  // Update layouts
  handleBoardsLayoutChange(layout: Layout) {
    this.props.dispatch(SettingActions.updateBoardsLayoutRequest(layout));
  }

  handleItemsLayoutChange(layout: Layout) {
    this.props.dispatch(SettingActions.updateItemsLayoutRequest(layout));
  }

  handleItemsSizeChange(size: number) {
    this.setState({
      itemsSize: size
    });

    this.props.dispatch(SettingActions.updateItemsSizeRequestDebounce(size));
  }

  // Update currentColor
  handleColorChange(color: string) {
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
      selectedBoardEntities
      // settings: { boardsLayout }
    } = this.props;

    const boardsLayout = "grid"; // TODO
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
              value="grid"
              tooltip="グリッド"
            />
            <LayoutButton
              icon={<ListIcon />}
              value="list"
              tooltip="リスト"
            />
          </LayoutButtonGroup>
        </div>
      )
    };
  }

  getHeaderBoardDetailProps(activeNavItem?: string) {
    const {
      currentBoard,
      selectedItemEntities
      // settings: { itemsLayout }
    } = this.props;

    const { boardName, itemsSize } = this.state;
    const itemsLayout = "gallery";
    const hasSelectedItem = selectedItemEntities.length > 0;

    return {
      activeNavItem,
      showColorBar: true,
      mainTitle: currentBoard && (
        <div>
          <CancelableEditText
            icon={<PencilIcon />}
            value={boardName}
            onComplete={this.handleBoardNameComplete}
          />
          <Spinner
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
        <div>Total {currentBoard.Items.length} items</div>
      ),
      subRight: (
        <div style={{ display: hasSelectedItem ? "none" : "block" }}>
          {itemsLayout !== "list" && <Slider
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
              value="gallery"
              tooltip="ギャラリー表示"
            />
            <LayoutButton
              icon={<GridIcon />}
              value="grid"
              tooltip="グリッド表示"
            />
            <LayoutButton
              icon={<ListIcon />}
              value="list"
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

  getHeaderOptionsProps() {
    return {
      mainTitle: <span>オプション</span>,
      showColorBar: false
    };
  }

  getHeader404Props() {
    return {/* TODO */};
  }

  getHeaderProps(): any {
    const { routes } = this.props;
    const currentComponent = routes[routes.length - 1].component.WrappedComponent;
    const currentComponentName = currentComponent ? currentComponent.name : "";

    switch (currentComponentName) {
      case "BoardsPage":
        return this.getHeaderBoardsProps();

      case "BoardDetailPage":
        return this.getHeaderBoardDetailProps(NavItemActive.BOARDS);

      case "AllItemsPage":
        return this.getHeaderBoardDetailProps(NavItemActive.ALL_ITEMS);

      case "StarsPage":
        return this.getHeaderBoardDetailProps();

      case "TagsPage":
        return this.getHeaderBoardDetailProps();

      // TODO
      case "OPTIIONS_PAGE_TODO":
        return this.getHeaderOptionsProps();

      default:
        return this.getHeader404Props();
    }
  }

  push(path: string) {
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
        onOptionsClick={this.handleOptionsClick}
        onColorChange={this.handleColorChange}
        onRequestSignOut={this.handleSignOut}
        {...headerProps}
      />
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    auth: state.auth,
    boards: state.boards,
    selectedBoardEntities: getSelectedBoardEntities(state),
    currentBoard: getCurrentBoard(state),
    items: state.items,
    selectedItemEntities: getSelectedItemEntities(state)
  })
)(HeaderContainer);
