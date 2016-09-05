/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MDSpinner from "react-md-spinner";
import { connect } from "react-redux";
import shareConfig from "../../../../share-config";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getCurrentItem } from "../../../selectors/items";
import { hexToRgb } from "../../../helpers/color";
import bem from "../../../helpers/bem";
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
  CancelableEditText
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

const b = bem("item-viewer-container");

export class ItemViewerContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.state = { zoom: 1 };

    autoBind(this);
  }

  handleClose() {
    this.props.dispatch(ItemActions.setCurrentItem(null));
    this.setState({ zoom: 1 });
  }

  handleZoomChange(zoom) {
    this.setState({ zoom });
  }

  handleImageDoubleClick() {
    this.setState({ zoom: 1 });
  }

  handleStarClick() {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.starItemToggleRequest(currentItem.id));
  }

  handleEditClick() {
    this.props.dispatch(ItemActions.setItemImageEditing(true));
  }

  handleMoreMenuClick(menuItem, value) {
    value();
  }

  handleMove() {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.moveItemSelectBoardOpen(currentItem.id));
  }

  handleDelete() {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.deleteItemRequest(currentItem.id));
  }

  handleDrawerToggle() {
    this.props.dispatch(ItemActions.itemDetailDrawerToggle());
  }

  handleItemNameComplete(value) {
    const { dispatch, currentItem } = this.props;
    dispatch(ItemActions.updateItemNameIfNeeded(currentItem.id, value));
  }

  handleEditComplete() {
    // TODO
  }

  handleEditCancel() {
    this.props.dispatch(ItemActions.setItemImageEditing(false));
  }

  handleEditReset(e) {
    e.preventDefault();
    this.refs.cropper.reset();
  }

  handleRotateLeft() {
    this.refs.cropper.rotate(-45);
  }

  handleRotateRight() {
    this.refs.cropper.rotate(45);
  }

  handleSwapVertical() {
    const { cropper } = this.refs;
    const { scaleY } = cropper.getData();
    cropper.scaleY(scaleY * -1);
  }

  handleSwapHorizontal() {
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
            <MDSpinner
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
              <MenuItem icon={<FolderIcon />} text="移動" value={this.handleMove} />
              <MenuItem icon={<TrashIcon />} text="削除" value={this.handleDelete} />
            </IconMenu>
          </ToolBarItem>
        ]}
      />
    );
  }

  renderEditingToolBar() {
    const { currentItem } = this.props;

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
          </ToolBarItem>,
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
    const imageSrc = `/api/items/image/${currentItem ? currentItem.id : ""}`;
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
              className={b("viewer", { enable: !isImageEditing })()}
              image={imageSrc}
              zoom={zoom}
              onZoomChange={this.handleZoomChange}
              onBodyClick={this.handleClose}
              onDoubleClick={this.handleImageDoubleClick}
            />
          </div>

          <Cropper
            ref="cropper"
            className={b("cropper", { enable: isImageEditing })()}
            src={imageSrc}
            enable={isImageEditing}
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
              backgroundColor: `rgba(${firstColor.r}, ${firstColor.g}, ${firstColor.b}, .9)`
            }}
          />
        </div>}
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  state => ({
    items: state.items,
    currentItem: getCurrentItem(state)
  }),
  null,
  null,
  { pure: false }
)(ItemViewerContainer);
