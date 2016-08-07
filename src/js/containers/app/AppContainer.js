/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as BoardActions from "../../actions/boards";
import * as ItemActions from "../../actions/items";
import * as ErrorActions from "../../actions/errors";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import { getBoardEntities, getBoardByIdFromBoards } from "../../selectors/boards";
import { HeaderSubContainer } from "./";
import {
  AddBoardDialog,
  AddItemFileDialog,
  FloatingMenu,
  FloatingButton,
  Snackbar
} from "../../components/ui/";
import {
  BoardIcon,
  PictureLinkIcon,
  UploadIcon
} from "../../components/svg-icons/";

const b = bem("app");

export class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      addItemFileDialogOpen: false,
      addItemSnackbarOpen: false
    };

    bindHandlers([
      "handleAddBoardOpen",
      "handleAddBoardClose",
      "handleAddBoard",
      "handleAddBoardActionClick",
      "handleAddBoardSnackbarClose",

      "handleAddLinkItemOpen",

      "handleAddItemFileOpen",
      "handleAddItemFileClose",
      "handleAddItemFile",

      "handleAddItemActionClick",
      "handleAddItemSnackbarClose",

      "handleErrorSnackbarClose"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(BoardActions.fetchBoardsRequest());
  }

  componentWillReceiveProps(nextProps) {
    const { items } = this.props;

    if (items.isAdding && !nextProps.items.isAdding) {
      this.setState({
        addItemFileDialogOpen: false,
        addItemSnackbarOpen: !nextProps.items.error
      });
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

  handleAddBoardSnackbarClose() {
    this.props.dispatch(BoardActions.addBoardSnackbarClose());
  }

  // Add item (link)
  handleAddLinkItemOpen() {
    // TODO
  }

  // Add item
  handleAddItemFileOpen() {
    this.setState({ addItemFileDialogOpen: true });
  }

  handleAddItemFileClose() {
    this.setState({ addItemFileDialogOpen: false });
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

  handleAddItemSnackbarClose() {
    this.setState({ addItemSnackbarOpen: false });
  }

  handleErrorSnackbarClose() {
    this.props.dispatch(ErrorActions.hideError());
  }

  render() {
    const {
      auth, // eslint-disable-line no-unused-vars
      settings, // eslint-disable-line no-unused-vars
      dispatch, // eslint-disable-line no-unused-vars
      children, // eslint-disable-line no-unused-vars
      errors,
      boards,
      boardEntities,
      items,
      ...routerParams
    } = this.props;

    const {
      addItemFileDialogOpen,
      addItemSnackbarOpen
    } = this.state;

    const floatingButtonTooltipOrigin = {
      vertical: "middle",
      horizontal: "left"
    };

    return (
      <div className={b()}>
        {/* Header */}
        <HeaderSubContainer {...routerParams} />

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
          open={boards.addDialogOpen}
          onRequestClose={this.handleAddBoardClose}
          onRequestAdd={this.handleAddBoard}
        />
        <Snackbar
          open={boards.addSnackbarOpen}
          message="ボードを追加しました"
          action="Show"
          onActionClick={this.handleAddBoardActionClick}
          onRequestClose={this.handleAddBoardSnackbarClose}
        />

        {/* Add item */}
        {/* TODO */}

        {/* Add item file */}
        <AddItemFileDialog
          processing={boards.isFetching || items.isAdding}
          open={addItemFileDialogOpen}
          selectBoards={boardEntities.map(board => ({
            name: board.name,
            value: board.id
          }))}
          defaultBoard={boards.currentBoardId}
          onRequestClose={this.handleAddItemFileClose}
          onRequestAdd={this.handleAddItemFile}
        />

        <Snackbar
          open={addItemSnackbarOpen}
          message="アイテムを追加しました"
          action="Show"
          onActionClick={this.handleAddItemActionClick}
          onRequestClose={this.handleAddItemSnackbarClose}
        />

        {/* Errors */}
        <Snackbar
          open={errors.hasError}
          message={errors.message}
          onRequestClose={this.handleErrorSnackbarClose}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    errors: state.errors,
    settings: state.settings,
    boards: state.boards,
    boardEntities: getBoardEntities(state),
    items: state.items
  }),
  null,
  null,
  { pure: false }
)(AppContainer);
