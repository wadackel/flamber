// @flow
import uuid from "node-uuid";
import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import KeyHandler from "react-key-handler";
import { connect } from "react-redux";
import shareConfig from "../../../share-config.json";
import * as ItemActions from "../../../actions/items";
import { getCurrentItem } from "../../../selectors/items";
import { hexToRgb } from "../../../helpers/color";
import bem from "../../../helpers/bem";
import { dataURLtoBlob } from "../../../utils/image";
import FirstChild from "../../../components/ui/internal/FirstChild";
import Overlay from "../../../components/ui/internal/Overlay";
import { ItemDetailContainer } from "./";
import {
  ImageViewer,
  Cropper,
  ToolBar,
  ToolBarItem,
  Slider,
  FloatingButton,
  IconButton,
  IconMenu,
  StarButton,
  MenuItem,
  CancelableEditText,
  Spinner
} from "../../../components/ui/";
import {
  PencilIcon,
  CloseIcon,
  CropRotateIcon,
  ResizeIcon,
  MoreVertIcon,
  FolderIcon,
  TrashIcon,
  CheckIcon,
  RefreshIcon,
  SwapVerticalIcon,
  SwapHorizontalIcon,
  RotateLeftIcon,
  RotateRightIcon
} from "../../../components/svg-icons/";

import type { Dispatch } from "redux";
import type { ConnectState } from "../../../types/redux";
import type { ItemState, ItemEntity } from "../../../types/item";


const b = bem("item-viewer-container");


type Props = {
  dispatch: Dispatch;
  items: ItemState;
  currentItem: ?ItemEntity;
};

type State = {
  zoom: number;
  imageSuffix: string;
};

export class ItemViewerContainer extends Component {
  props: Props;
  state: State = {
    zoom: 1,
    imageSuffix: ""
  };

  componentWillReceiveProps(nextProps: Props) {
    const { currentItem } = this.props;
    const { currentItem: _currentItem } = nextProps;

    if (!currentItem && _currentItem) {
      this.setState({ imageSuffix: "" });
    }

    if (
      currentItem &&
      _currentItem &&
      currentItem.isImageUpdating &&
      !_currentItem.isImageUpdating
    ) {
      this.setState({ imageSuffix: uuid.v4() });
    }
  }

  handleClose = () => {
    this.props.dispatch(ItemActions.setCurrentItem(null));
    this.setState({ zoom: 1 });
  }

  handleZoomChange = (zoom: number) => {
    this.setState({ zoom });
  }

  handleImageDoubleClick = () => {
    this.setState({ zoom: 1 });
  }

  handleStarClick = () => {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.starItemToggleRequest(currentItem.id));
    }
  }

  handleEditClick = () => {
    this.props.dispatch(ItemActions.setItemImageEditing(true));
  }

  handleMoreMenuClick = (menuItem: MenuItem, value: Function) => {
    value();
  }

  handleMove = () => {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.moveItemSelectBoardOpen(currentItem.id));
    }
  }

  handleDelete = () => {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.deleteItemRequest(currentItem.id));
    }
  }

  handleDrawerToggle = () => {
    this.props.dispatch(ItemActions.itemDetailDrawerToggle());
  }

  handleItemNameComplete = (value: string) => {
    const { dispatch, currentItem } = this.props;
    if (currentItem) {
      dispatch(ItemActions.updateItemNameIfNeeded(currentItem.id, value));
    }
  }

  handleEditComplete = () => {
    const { dispatch, currentItem } = this.props;
    const blob = dataURLtoBlob(this.refs.cropper.getCroppedCanvas().toDataURL());
    if (currentItem) {
      dispatch(ItemActions.updateItemImageRequest(currentItem.id, blob));
    }
  }

  handleEditCancel = () => {
    this.props.dispatch(ItemActions.setItemImageEditing(false));
  }

  handleEditReset = (e: SyntheticMouseEvent) => {
    e.preventDefault();
    this.refs.cropper.reset();
  }

  handleRotateLeft = () => {
    this.refs.cropper.rotate(-45);
  }

  handleRotateRight = () => {
    this.refs.cropper.rotate(45);
  }

  handleSwapVertical = () => {
    const { cropper } = this.refs;
    const { scaleY } = cropper.getData();
    cropper.scaleY(scaleY * -1);
  }

  handleSwapHorizontal = () => {
    const { cropper } = this.refs;
    const { scaleX } = cropper.getData();
    cropper.scaleX(scaleX * -1);
  }

  getModifier() {
    const { items, currentItem } = this.props;

    return {
      "drawer-open": items.detailDrawerOpen,
      show: !!currentItem
    };
  }

  renderNormalToolBar() {
    const { currentItem } = this.props;

    if (!currentItem) return null;

    return (
      <ToolBar
        className={b("tool-bar")()}
        title={
          <div>
            <CancelableEditText
              icon={<PencilIcon />}
              value={currentItem.name}
              onComplete={this.handleItemNameComplete}
            />
            <Spinner
              size={14}
              style={{
                visibility: currentItem.isNameUpdating ? "visible" : "hidden",
                marginLeft: 10
              }}
            />
          </div>
        }
        left={[
          <ToolBarItem>
            <IconButton
              icon={<CloseIcon />}
              onClick={this.handleClose}
            />
          </ToolBarItem>
        ]}
        right={[
          <ToolBarItem>
            <IconButton
              icon={<CropRotateIcon />}
              tooltip="画像を編集"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleEditClick}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <StarButton
              active={currentItem.star}
              tooltip={currentItem.star ? "スターを外す" : "スターを付ける"}
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleStarClick}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconMenu
              icon={<IconButton icon={<MoreVertIcon />} />}
              origin={{ vertical: "top", horizontal: "right" }}
              triggerOrigin={{ vertical: "top", horizontal: "right" }}
              onItemClick={this.handleMoreMenuClick}
            >
              <MenuItem icon={<FolderIcon />} primary="移動" value={this.handleMove} />
              <MenuItem icon={<TrashIcon />} primary="削除" value={this.handleDelete} />
            </IconMenu>
          </ToolBarItem>
        ]}
      />
    );
  }

  renderEditingToolBar() {
    const { currentItem } = this.props;

    if (!currentItem) return null;

    return (
      <ToolBar
        className={b("tool-bar")()}
        title={currentItem.name}
        left={[
          <ToolBarItem>
            <IconButton
              icon={<CheckIcon />}
              tooltip="画像を更新"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleEditComplete}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconButton
              icon={<CloseIcon />}
              tooltip="キャンセル"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleEditCancel}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconButton
              icon={<RefreshIcon />}
              tooltip="やり直し"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleEditReset}
            />
          </ToolBarItem>
        ]}
        right={[
          <ToolBarItem>
            <IconButton
              icon={<RotateLeftIcon />}
              tooltip="左に回転"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleRotateLeft}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconButton
              icon={<RotateRightIcon />}
              tooltip="右に回転"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleRotateRight}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconButton
              icon={<SwapVerticalIcon />}
              tooltip="縦に反転"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleSwapVertical}
            />
          </ToolBarItem>,
          <ToolBarItem>
            <IconButton
              icon={<SwapHorizontalIcon />}
              tooltip="横に反転"
              tooltipOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClick={this.handleSwapHorizontal}
            />
          </ToolBarItem>
        ]}
      />
    );
  }

  renderToolBar() {
    return this.props.items.isImageEditing
      ? this.renderEditingToolBar()
      : this.renderNormalToolBar();
  }

  render() {
    const { items, currentItem } = this.props;
    const { zoom } = this.state;
    const { isImageEditing } = items;
    const modifier = this.getModifier();

    if (!currentItem) return null;

    const firstColor = modifier.show ? hexToRgb(currentItem.palette[0]) || {} : null;

    return (
      <ReactCSSTransitionGroup
        component={FirstChild}
        transitionName="item-viewer"
        transitionEnterTimeout={shareConfig["item-viewer-enter-duration"]}
        transitionLeaveTimeout={shareConfig["item-viewer-leave-duration"]}
      >
        {modifier.show && <div className={b(modifier)()}>
          {this.renderToolBar()}

          <KeyHandler keyEventName="keydown" keyValue="Escape" onKeyHandle={this.handleClose} />

          <div className={b("body", modifier)()}>
            {!isImageEditing && <Slider
              className={b("zoom")()}
              min={0.2}
              max={1.8}
              step={0.1}
              value={zoom}
              onChange={this.handleZoomChange}
            />}

            <ImageViewer
              className={b("viewer", { show: !isImageEditing })()}
              image={currentItem.image}
              zoom={zoom}
              onZoomChange={this.handleZoomChange}
              onBodyClick={this.handleClose}
              onDoubleClick={this.handleImageDoubleClick}
            />
          </div>

          <Cropper
            ref="cropper"
            className={b("cropper", { show: isImageEditing })()}
            src={currentItem.image}
            processing={currentItem.isImageUpdating}
            enable={isImageEditing && !currentItem.isImageUpdating}
            viewMode={2}
            dragMode="move"
            toggleDragModeOnDblclick={false}
            onDoubleClick={this.handleEditReset}
          />

          {!isImageEditing &&
            <FloatingButton
              className={b("drawer-toggle", modifier)()}
              icon={<ResizeIcon />}
              onClick={this.handleDrawerToggle}
            />
          }

          <ItemDetailContainer />

          <Overlay
            className={b("overlay")()}
            show={true}
            style={{
              backgroundColor: firstColor
                ? `rgba(${firstColor.r}, ${firstColor.g}, ${firstColor.b}, .9)`
                : "rgba(0, 0, 0, .9)"
            }}
          />
        </div>}
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  (state: ConnectState) => ({
    items: state.items,
    currentItem: getCurrentItem(state)
  })
)(ItemViewerContainer);
