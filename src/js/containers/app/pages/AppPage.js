// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../actions/application";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import {
  getBoardEntities,
  getSelectedBoardEntities
} from "../../../selectors/boards";
import { getSelectedItemEntities } from "../../../selectors/items";
import {
  AddBoardDialogContainer,
  AddItemFileDialogContainer,
  AddItemURLDialogContainer,
  HeaderContainer,
  ItemViewerContainer,
  ShortcutKeyContainer,
  NotificationsContainer,
  TagDrawerContainer
} from "../ui/";
import { FileDnD, FloatingMenu, FloatingButton } from "../../../components/ui/";
import { BoardIcon, PictureLinkIcon, UploadIcon } from "../../../components/svg-icons/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { AppState } from "../../../types/application";
import type { AuthState } from "../../../types/auth";
import type { BoardState, BoardEntities } from "../../../types/board";
import type { ItemEntities } from "../../../types/item";
import type { TagState } from "../../../types/tag";


const b = bem("app-page");

type Props = {
  dispatch: Dispatch;
  application: AppState;
  children: React$Element<any>;
  auth: AuthState;
  boards: BoardState;
  boardEntities: BoardEntities;
  selectedBoardEntities: BoardEntities;
  ItemEntities: ItemEntities;
  selectedItemEntities: ItemEntities;
  tags: TagState;
};

type State = {
  dropFile: ?File;
  dragging: boolean;
};

export class AppPage extends Component {
  props: Props;
  state: State = {
    dropFile: null,
    dragging: false
  };

  static contextTypes = {
    theme: PropTypes.string.isRequired
  };

  // Menu
  handleMenuOpen = () => {
    this.props.dispatch(AppActions.appMenuOpen());
  }

  handleMenuClose = () => {
    this.props.dispatch(AppActions.appMenuClose());
  }

  // Dragging
  handleDragStart = () => {
    if (this.props.auth.authenticated && !this.state.dragging) {
      this.setState({ dragging: true });
    }
  }

  handleDragEnd = () => {
    if (this.props.auth.authenticated && this.state.dragging) {
      this.setState({ dragging: false });
    }
  }

  handleDrop = (dataTransfer: DataTransfer) => {
    const { files } = dataTransfer;

    if (files.length > 0) {
      // TODO
      console.log("TODO: Drop file to AddItemDialog component.", files[0]);
      // this.setState({ dropFile: files[0] });
      // this.props.dispatch(ItemActions.addItemFileDialogOpen());
    }
  }

  // Dialog
  handleAddBoardOpen = () => {
    this.props.dispatch(BoardActions.addBoardDialogOpen());
  }

  handleAddItemFileOpen = () => {
    this.props.dispatch(ItemActions.addItemFileDialogOpen());
  }

  handleAddItemURLOpen = () => {
    this.props.dispatch(ItemActions.addItemURLDialogOpen());
  }

  // Render
  renderContent() {
    const {
      application,
      auth: { authenticated, hasJwtToken },
      children,
      boards,
      selectedBoardEntities,
      selectedItemEntities,
      tags
    } = this.props;

    // loading
    if (!authenticated && hasJwtToken) {
      // TODO: Styling
      return null;
    }

    const floatingButtonTooltipOrigin = {
      vertical: "middle",
      horizontal: "left"
    };

    const hasSelectedEntity = selectedItemEntities.length > 0 || selectedBoardEntities.length > 0;

    return (
      <div>
        <div className={b("content", { "is-tag-drawer-open": tags.drawerOpen })()}>
          {children}
        </div>

        {/* Menu */}
        <FloatingMenu
          className={b("floating-menu", { "has-selected-entity": hasSelectedEntity })()}
          open={application.isMenuOpen}
          onRequestOpen={this.handleMenuOpen}
          onRequestClose={this.handleMenuClose}
        >
          <FloatingButton
            type="primary"
            icon={<BoardIcon />}
            tooltip="ボードの追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddBoardOpen}
          />
          {boards.results.length > 0 && <FloatingButton
            type="primary"
            icon={<PictureLinkIcon />}
            tooltip="URLからアイテムを追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddItemURLOpen}
          />}
          {boards.results.length > 0 && <FloatingButton
            type="primary"
            icon={<UploadIcon />}
            tooltip="ファイルからアイテムを追加"
            tooltipOrigin={floatingButtonTooltipOrigin}
            onClick={this.handleAddItemFileOpen}
          />}
        </FloatingMenu>

        {/* Add board & item dialog */}
        <AddBoardDialogContainer />
        <AddItemFileDialogContainer />
        <AddItemURLDialogContainer />
      </div>
    );
  }

  render() {
    const {
      auth, // eslint-disable-line no-unused-vars
      dispatch, // eslint-disable-line no-unused-vars
      children, // eslint-disable-line no-unused-vars
      boards, // eslint-disable-line no-unused-vars
      boardEntities, // eslint-disable-line no-unused-vars
      selectedBoardEntities, // eslint-disable-line no-unused-vars
      selectedItemEntities, // eslint-disable-line no-unused-vars
      tags, // eslint-disable-line no-unused-vars
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
  (state: ConnectState) => ({
    application: state.application,
    auth: state.auth,
    boards: state.boards,
    boardEntities: getBoardEntities(state),
    selectedBoardEntities: getSelectedBoardEntities(state),
    selectedItemEntities: getSelectedItemEntities(state),
    tags: state.tags
  })
)(AppPage);
