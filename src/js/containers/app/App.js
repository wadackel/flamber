/* eslint-disable */
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import MDSpinner from "react-md-spinner";
import * as Layout from "../../constants/layouts";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import { updateSettingsRequest } from "../../actions/settings";
import {
  fetchBoardsRequest,
  addBoardRequest,
  updateBoardRequest,
  addItemRequest
} from "../../actions/boards";
import { boardSelectorByBoards } from "../../selectors/boards";
import {
  AddBoardDialog,
  AddItemFileDialog,
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
  Snackbar
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
      addBoardDialogOpen: false,
      addBoardSnackbarOpen: false,
      addItemFileDialogOpen: false,
      addItemFileSnackbarOpen: false,
      boardName: "",
    };

    bindHandlers([
      "handleMyItemsClick",
      "handleFeedsClick",
      "handleLogoClick",
      "handleSettingsClick",

      "handleAddBoardOpen",
      "handleAddBoardClose",
      "handleAddBoard",
      "handleAddBoardSnackbarClose",

      "handleBoardNameChange",
      "handleBoardNameComplete",

      "handleAddLinkItemOpen",

      "handleAddItemFileOpen",
      "handleAddItemFileClose",
      "handleAddItemFile",
      "handleAddItemFileSnackbarClose",

      "handleBoardsLayoutChange"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
  }

  componentWillReceiveProps(nextProps) {
    const { boards, params } = this.props;

    if (boards.isAdding && !nextProps.boards.isAdding) {
      this.setState({
        addBoardDialogOpen: false,
        addBoardSnackbarOpen: true,
      });
    }

    if (boards.isItemAdding && !nextProps.boards.isItemAdding) {
      this.setState({
        addItemFileDialogOpen: false,
        addItemFileSnackbarOpen: true
      });
    }

    const nextBoard = boardSelectorByBoards(nextProps.boards, params.id);

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

  // Add board
  handleAddBoardOpen() {
    this.setState({ addBoardDialogOpen: true });
  }

  handleAddBoardClose() {
    this.setState({ addBoardDialogOpen: false });
  }

  handleAddBoard(boardName) {
    this.props.dispatch(addBoardRequest(boardName));
  }

  handleAddBoardSnackbarClose() {
    this.setState({ addBoardSnackbarOpen: false });
  }

  // Update board
  handleBoardNameChange(e, value) {
    this.setState({ boardName: value });
  }

  handleBoardNameComplete(value) {
    const { boards, params } = this.props;
    const board = _.find(boards.entities, o => o.id === params.id);

    this.props.dispatch(updateBoardRequest({
      ...board,
      name: value
    }));

    this.setState({ boardName: value });
  }

  // Add item (link)
  handleAddLinkItemOpen() {
    // TODO
  }

  // Add item
  handleAddItemFileOpen() {
    const { boards: { entities } } = this.props;
    this.setState({ addItemFileDialogOpen: true });
  }

  handleAddItemFileClose() {
    this.setState({ addItemFileDialogOpen: false });
  }

  handleAddItemFile(file, palette, boardId) {
    this.props.dispatch(addItemRequest({
      file,
      palette,
      boardId
    }));
  }

  handleAddItemFileSnackbarClose() {
    this.setState({ addItemFileSnackbarOpen: false });
  }

  handleBoardsLayoutChange(layout) {
    const settings = {
      ...this.props.settings,
      boardsLayout: layout
    };

    this.props.dispatch(updateSettingsRequest(settings));
  }

  push(path) {
    this.props.dispatch(push(path));
  }

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
    const {
      boardsLayout
    } = this.props.settings;

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
    const { boards, params } = this.props;
    const { isUpdating } = boards;
    const { boardName } = this.state;
    const board = boardSelectorByBoards(boards, params.id);

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
      subRight: (
        <div>
          <LayoutButtonGroup
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

  render() {
    const {
      auth: { user },
      boards
    } = this.props;

    const {
      addBoardDialogOpen,
      addBoardSnackbarOpen,
      addItemFileDialogOpen,
      addItemFileSnackbarOpen
    } = this.state;

    const {
      activeNavItem,
      ...headerProps
    } = this.getHeaderProps();

    const floatingButtonTooltipOrigin = {
      vertical: "middle",
      horizontal: "left"
    };

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
          <FloatingButton
            type="primary"
            icon={<BoardIcon />}
            tooltip="ボードの追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddBoardOpen}
          />
          <FloatingButton
            type="primary"
            icon={<PictureLinkIcon />}
            tooltip="URLからアイテムを追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddLinkItemOpen}
          />
          <FloatingButton
            type="primary"
            icon={<UploadIcon />}
            tooltip="ファイルからアイテムを追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddItemFileOpen}
          />
        </FloatingMenu>

        {/* Add board */}
        <AddBoardDialog
          processing={boards.isAdding}
          open={addBoardDialogOpen}
          onRequestClose={this.handleAddBoardClose}
          onRequestAdd={this.handleAddBoard}
        />
        <Snackbar
          open={addBoardSnackbarOpen}
          message="ボードを追加しました"
          action="Show"
          onActionClick={() => console.log("TODO")}
          onRequestClose={this.handleAddBoardSnackbarClose}
        />

        {/* Add item file */}
        <AddItemFileDialog
          processing={boards.isFetching || boards.isItemAdding}
          open={addItemFileDialogOpen}
          selectBoards={boards.entities.map(board => ({
            name: board.name,
            value: board.id
          }))}
          onRequestClose={this.handleAddItemFileClose}
          onRequestAdd={this.handleAddItemFile}
        />
        <Snackbar
          open={addItemFileSnackbarOpen}
          message="アイテムを追加しました"
          action="Show"
          onActionClick={() => console.log("TODO")}
          onRequestClose={this.handleAddItemFileSnackbarClose}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings,
    boards: state.boards
  }),
  null,
  null,
  { pure: false }
)(App);
