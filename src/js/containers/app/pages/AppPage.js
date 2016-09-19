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
  ItemViewerContainer,
  ShortcutKeyContainer,
  NotificationsContainer,
  TagDrawerContainer
} from "../ui/";
import {
  AddBoardDialog,
  AddItemFileDialog,
  AddItemURLDialog,
  FileDnD,
  FloatingMenu,
  FloatingButton
} from "../../../components/ui/";
import {
  BoardIcon,
  PictureLinkIcon,
  UploadIcon
} from "../../../components/svg-icons/";

const b = bem("app-page");

export class AppPage extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      dropFile: null,
      dragging: false
    };

    autoBind(this);
  }

  // Dragging
  handleDragStart() {
    if (this.props.auth.authenticated && !this.state.dragging) {
      this.setState({ dragging: true });
    }
  }

  handleDragEnd() {
    if (this.props.auth.authenticated && this.state.dragging) {
      this.setState({ dragging: false });
    }
  }

  handleDrop(dataTransfer) {
    const { files } = dataTransfer;

    if (files.length > 0) {
      this.setState({ dropFile: files[0] });
      this.props.dispatch(ItemActions.addItemFileDialogOpen());
    }
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
  handleAddItemURLOpen() {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  handleAddItemURLClose() {
    this.props.dispatch(ItemActions.addItemURLDialogClose());
  }

  handleAddItemURL(url, board) {
    this.props.dispatch(ItemActions.addItemURLRequest(url, board));
  }

  // Add item
  handleAddItemFileOpen() {
    this.props.dispatch(ItemActions.addItemFileDialogOpen());
  }

  handleAddItemFileClose() {
    this.props.dispatch(ItemActions.addItemFileDialogClose());
  }

  handleAddItemFile(file, palette, board) {
    this.props.dispatch(ItemActions.addItemFileRequest(board, file, palette));
  }

  handleAddItemActionClick() {
    // TODO
  }

  // Render
  renderContent() {
    const {
      auth: { authenticated, hasJwtToken },
      children,
      boards,
      boardEntities,
      selectedBoardEntities,
      items,
      selectedItemEntities
    } = this.props;

    // loading
    if (!authenticated && hasJwtToken) {
      // TODO: Styling
      return null;
    }

    // contents
    const { dropFile } = this.state;

    const floatingButtonTooltipOrigin = {
      vertical: "middle",
      horizontal: "left"
    };

    const hasSelectedEntity =
      selectedItemEntities.length > 0
      || selectedBoardEntities.length > 0;

    const selectBoards = boardEntities.map(board => ({
      name: board.name,
      value: board.id
    }));

    return (
      <div>
        <div className={b("content")()}>
          {children}
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
            onClick={this.handleAddItemURLOpen}
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
        <AddItemURLDialog
          processing={boards.isFetching || items.isAdding}
          open={items.addURLDialogOpen}
          selectBoards={selectBoards}
          defaultBoard={boards.currentBoardId}
          onRequestClose={this.handleAddItemURLClose}
          onRequestAdd={this.handleAddItemURL}
        />

        {/* Add item file */}
        <AddItemFileDialog
          processing={boards.isFetching || items.isAdding}
          open={items.addFileDialogOpen}
          file={dropFile}
          selectBoards={selectBoards}
          defaultBoard={boards.currentBoardId}
          onRequestClose={this.handleAddItemFileClose}
          onRequestAdd={this.handleAddItemFile}
        />
      </div>
    );
  }

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
      selectedItemEntities, // eslint-disable-line no-unused-vars
      ...routerParams
    } = this.props;

    const { dragging } = this.state;

    return (
      <div className={b({ dragging })()}>
        <FileDnD
          className={b("dnd", { dragging })()}
          overlay={
            <p className={b("dnd__title")()}>画像のドラッグ&ドロップでアイテム作成</p>
          }
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onDrop={this.handleDrop}
        >

          {/* Header */}
          <HeaderContainer {...routerParams} />

          {/* Item viewer */}
          <ItemViewerContainer />

          {/* Tag sidebar */}
          <TagDrawerContainer />

          {/* Shortcut */}
          <ShortcutKeyContainer />

          {/* Notifications */}
          <NotificationsContainer />

          {/* Content */}
          {this.renderContent()}
        </FileDnD>
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
)(AppPage);
