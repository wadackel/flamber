/* eslint-disable */
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import * as TagActions from "../../../actions/tags";
import bem from "../../../helpers/bem";
import {
  getBoardEntities,
  getBoardByIdFromBoards,
  getSelectedBoardEntities
} from "../../../selectors/boards";
import { getSelectedItemEntities } from "../../../selectors/items";
import {
  HeaderContainer,
  ShortcutKeyContainer,
  NotificationsContainer,
  TagDrawerContainer
} from "../ui/";
import {
  AddBoardDialog,
  AddItemFileDialog,
  FloatingMenu,
  FloatingButton
} from "../../../components/ui/";
import {
  BoardIcon,
  PictureLinkIcon,
  UploadIcon
} from "../../../components/svg-icons/";

const b = bem("app");

export class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(BoardActions.fetchBoardsRequest());
    this.props.dispatch(TagActions.fetchTagsRequest());
  }

  // Add board
  handleAddBoardOpen() {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddBoardClose() {
    this.props.dispatch(BoardActions.addBoardDialogClose());
  }

  handleAddBoard(boardName) {
    this.props.dispatch(BoardActions.addBoardRequest(boardName));
  }

  handleAddBoardActionClick() {
    // TODO
  }

  // Add item (link)
  handleAddLinkItemOpen() {
    // TODO
  }

  // Add item
  handleAddItemFileOpen() {
    this.props.dispatch(ItemActions.addItemDialogOpen());
  }

  handleAddItemFileClose() {
    this.props.dispatch(ItemActions.addItemDialogClose());
  }

  handleAddItemFile(file, palette, boardId) {
    this.props.dispatch(ItemActions.addItemRequest({
      file,
      palette,
      boardId
    }));
  }

  handleAddItemActionClick() {
    // TODO
  }


  // Render
  render() {
    const {
      auth, // eslint-disable-line no-unused-vars
      settings, // eslint-disable-line no-unused-vars
      dispatch, // eslint-disable-line no-unused-vars
      children, // eslint-disable-line no-unused-vars
      boards,
      boardEntities,
      selectedBoardEntities,
      items,
      selectedItemEntities,
      ...routerParams
    } = this.props;

    const floatingButtonTooltipOrigin = {
      vertical: "middle",
      horizontal: "left"
    };

    const hasSelectedEntity =
      selectedItemEntities.length > 0
      || selectedBoardEntities.length > 0;

    return (
      <div className={b()}>
        {/* Header */}
        <HeaderContainer {...routerParams} />

        {/* Tag sidebar */}
        <TagDrawerContainer />

        {/* Shortcut */}
        <ShortcutKeyContainer />

        {/* Notifications */}
        <NotificationsContainer />

        {/* Content */}
        <div className={b("content")()}>
          {this.props.children}
        </div>

        {/* Menu */}
        <FloatingMenu className={b("floating-menu", { "has-selected-entity": hasSelectedEntity })()}>
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
          open={boards.addDialogOpen}
          onRequestClose={this.handleAddBoardClose}
          onRequestAdd={this.handleAddBoard}
        />

        {/* Add item */}
        {/* TODO */}

        {/* Add item file */}
        <AddItemFileDialog
          processing={boards.isFetching || items.isAdding}
          open={items.addDialogOpen}
          selectBoards={boardEntities.map(board => ({
            name: board.name,
            value: board.id
          }))}
          defaultBoard={boards.currentBoardId}
          onRequestClose={this.handleAddItemFileClose}
          onRequestAdd={this.handleAddItemFile}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    settings: state.settings,
    boards: state.boards,
    boardEntities: getBoardEntities(state),
    selectedBoardEntities: getSelectedBoardEntities(state),
    items: state.items,
    selectedItemEntities: getSelectedItemEntities(state)
  }),
  null,
  null,
  { pure: false }
)(AppContainer);
