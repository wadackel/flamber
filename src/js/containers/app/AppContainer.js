/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import bem from "../../helpers/bem";
import bindHandlers from "../../helpers/bind-handlers";
import {
  updateBoardsLayoutRequest,
  updateItemsLayoutRequest
} from "../../actions/settings";
import {
  fetchBoardsRequest,
  addBoardRequest,
  updateBoardRequest
} from "../../actions/boards";
import { addItemRequest } from "../../actions/items";
import { getBoardEntities, getBoardByIdFromBoards } from "../../selectors/boards";
import {
  HeaderSubContainer
} from "./";
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
      addBoardDialogOpen: false,
      addBoardSnackbarOpen: false,
      addBoardSnackbarMessage: "",
      addItemFileDialogOpen: false,
      addItemFileSnackbarOpen: false,
      addItemFileSnackbarMessage: ""
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
      "handleAddItemFileSnackbarClose"
    ], this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBoardsRequest());
  }

  componentWillReceiveProps(nextProps) {
    const { boards, items } = this.props;

    if (boards.isAdding && !nextProps.boards.isAdding) {
      this.setState({
        addBoardDialogOpen: false,
        addBoardSnackbarOpen: true,
        addBoardSnackbarMessage: nextProps.boards.error
          ? "ボード追加でエラーが発生しました"
          : "ボードを追加しました"
      });
    }

    if (items.isAdding && !nextProps.items.isAdding) {
      this.setState({
        addItemFileDialogOpen: false,
        addItemFileSnackbarOpen: true,
        addItemFileSnackbarMessage: nextProps.boards.error
          ? "アイテム追加でエラーが発生しました"
          : "アイテムを追加しました"
      });
    }
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

  handleAddBoardActionClick() {
    const { boards: { entities } } = this.props;
    const lastBoardId = entities[entities.length - 1]._id;
    this.props.dispatch(push(`/app/board/${lastBoardId}`));
    this.setState({ addBoardSnackbarOpen: false });
  }

  handleAddBoardSnackbarClose() {
    this.setState({ addBoardSnackbarOpen: false });
  }

  // Update board
  handleBoardNameChange(e, value) {
    this.setState({ boardName: value });
  }

  handleBoardNameComplete(value) {
    // TODO
    // const { boards, params } = this.props;
    // const board = getBoardByIdFromBoards(boards, params.id);
    //
    // this.props.dispatch(updateBoardRequest({
    //   ...board,
    //   name: value
    // }));
    //
    // this.setState({ boardName: value });
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
    this.props.dispatch(addItemRequest({
      file,
      palette,
      boardId
    }));
  }

  handleAddItemFileSnackbarClose() {
    this.setState({ addItemFileSnackbarOpen: false });
  }

  render() {
    const {
      auth, // eslint-disable-line no-unused-vars
      settings, // eslint-disable-line no-unused-vars
      dispatch, // eslint-disable-line no-unused-vars
      children, // eslint-disable-line no-unused-vars
      boards,
      boardEntities,
      items,
      ...routerParams
    } = this.props;

    const {
      addBoardDialogOpen,
      addBoardSnackbarOpen,
      addBoardSnackbarMessage,
      addItemFileDialogOpen,
      addItemFileSnackbarOpen,
      addItemFileSnackbarMessage
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
          open={addBoardDialogOpen}
          onRequestClose={this.handleAddBoardClose}
          onRequestAdd={this.handleAddBoard}
        />
        <Snackbar
          open={addBoardSnackbarOpen}
          message={addBoardSnackbarMessage}
          action={boards.error ? null : "Show"}
          onActionClick={this.handleAddBoardActionClick}
          onRequestClose={this.handleAddBoardSnackbarClose}
        />

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
          open={addItemFileSnackbarOpen}
          message={addItemFileSnackbarMessage}
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
    boards: state.boards,
    boardEntities: getBoardEntities(state),
    items: state.items
  }),
  null,
  null,
  { pure: false }
)(AppContainer);
