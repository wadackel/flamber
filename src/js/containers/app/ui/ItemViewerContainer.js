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
  CropIcon,
  ResizeIcon,
  MoreVertIcon,
  FolderIcon,
  TrashIcon
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

  render() {
    const { items, currentItem } = this.props;
    const { zoom } = this.state;

    const show = !!currentItem;
    const modifier = {
      "drawer-open": items.detailDrawerOpen,
      show
    };

    const firstColor = show ? hexToRgb(currentItem.palette[0]) || {} : null;

    return (
      <ReactCSSTransitionGroup
        component={FirstChild}
        transitionName="item-viewer"
        transitionEnterTimeout={shareConfig["item-viewer-enter-duration"]}
        transitionLeaveTimeout={shareConfig["item-viewer-leave-duration"]}
      >
        {show && <div className={b(modifier)()}>
          <div className={b("body", modifier)()}>
            <Slider
              className={b("zoom")()}
              min={0.2}
              max={1.8}
              step={0.1}
              value={zoom}
              onChange={this.handleZoomChange}
            />

            <ImageViewer
              className={b("viewer")()}
              image={`/api/items/image/${currentItem.id}`}
              zoom={zoom}
              onZoomChange={this.handleZoomChange}
              onBodyClick={this.handleClose}
              onDoubleClick={this.handleImageDoubleClick}
            />
          </div>

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
                  icon={<CropIcon />}
                />
              </ToolBarItem>,
              <ToolBarItem>
                <StarButton
                  active={currentItem.star}
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
              </ToolBarItem>,
            ]}
          />

          <FloatingButton
            className={b("drawer-toggle", modifier)()}
            icon={<ResizeIcon />}
            onClick={this.handleDrawerToggle}
          />

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
