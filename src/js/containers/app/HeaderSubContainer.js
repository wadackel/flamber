/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import MDSpinner from "react-md-spinner";
import * as Layout from "../../constants/layouts";
import bindHandlers from "../../helpers/bind-handlers";
import { updateItemsSizeRequest } from "../../actions/settings";
import { updateBoardRequest } from "../../actions/boards";
import { getBoardByIdFromBoards, getCurrentBoardFromBoards } from "../../selectors/boards";
import { getSelectedItemsFromItems } from "../../selectors/items";
import {
  Header,
  EditableText,
  NavItem,
  IconButton,
  LayoutButtonGroup,
  LayoutButton,
  SearchField,
  Slider
} from "../../components/ui/";
import {
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

export class HeaderSubContainer extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      boardName: "",
      itemsSize: props.settings.itemsSize
    };

    this.debounceItemsSizeChange = _.debounce(this.debounceItemsSizeChange, 500);

    bindHandlers([
      "handleMyItemsClick",
      "handleFeedsClick",
      "handleLogoClick",
      "handleSettingsClick",

      "handleBoardsLayoutChange",
      "handleItemsLayoutChange",

      "handleItemsSizeChange"
    ], this);
  }

  componentWillReceiveProps(nextProps) {
    const nextBoard = getBoardByIdFromBoards(nextProps.boards, nextProps.boards.currentBoardId);

    if (nextBoard && nextBoard.name !== this.state.boardName && !nextProps.boards.isUpdating) {
      this.setState({
        boardName: nextBoard.name
      });
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

  // Update board
  handleBoardNameChange(e, value) {
    this.setState({ boardName: value });
  }

  handleBoardNameComplete(value) {
    const { boards, params } = this.props;
    const board = getBoardByIdFromBoards(boards, params.id);

    this.props.dispatch(updateBoardRequest({
      ...board,
      name: value
    }));

    this.setState({ boardName: value });
  }

  // Update layouts
  handleBoardsLayoutChange(layout) {
    this.props.dispatch(updateBoardsLayoutRequest(layout));
  }

  handleItemsLayoutChange(layout) {
    this.props.dispatch(updateItemsLayoutRequest(layout));
  }

  handleItemsSizeChange(size) {
    this.setState({
      itemsSize: size
    });

    this.debounceItemsSizeChange(size);
  }

  // Header props
  getHeaderMyItemsSubLeft() {
    return (
      <div>
        <IconButton icon={<TagsIcon />} />
        <IconButton icon={<StarIcon />} />
        <SearchField
          placeholder="Type search keyword"
        />
      </div>
    );
  }

  getHeaderBoardsProps() {
    const { boardsLayout } = this.props.settings;

    return {
      activeNavItem: NavItemActive.MY_ITEMS,
      subLeft: this.getHeaderMyItemsSubLeft(),
      subRight: (
        <div>
          <LayoutButtonGroup
            value={boardsLayout}
            onChange={this.handleBoardsLayoutChange}
          >
            <LayoutButton icon={<GridIcon />} value={Layout.GRID}></LayoutButton>
            <LayoutButton icon={<ListIcon />} value={Layout.LIST}></LayoutButton>
          </LayoutButtonGroup>
        </div>
      )
    };
  }

  getHeaderBoardDetailProps() {
    const {
      boards,
      items,
      settings: { itemsLayout }
    } = this.props;

    const { isUpdating } = boards;
    const { boardName, itemsSize } = this.state;
    const board = getCurrentBoardFromBoards(boards);
    const hasSelectedItem = getSelectedItemsFromItems(items).length > 0;

    return {
      activeNavItem: NavItemActive.MY_ITEMS,
      mainTitle: board && (
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
              visibility: isUpdating ? "visible" : "hidden",
              marginLeft: 10
            }}
          />
        </div>
      ),
      subLeft: this.getHeaderMyItemsSubLeft(),
      subTitle: board && (
        <div>Total {board.itemCount} items</div>
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

  debounceItemsSizeChange(size) {
    this.props.dispatch(updateItemsSizeRequest(size));
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
    items: state.items
  }),
  null,
  null,
  { pure: false }
)(HeaderSubContainer);
