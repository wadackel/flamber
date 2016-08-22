/* eslint-disable */
import _ from "lodash";
import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MDSpinner from "react-md-spinner";
import { connect } from "react-redux";
import * as SettingActions from "../../../actions/settings";
import * as BoardActions from "../../../actions/boards";
import * as ItemActions from "../../../actions/items";
import { getCurrentItem } from "../../../selectors/items";
import bem from "../../../helpers/bem";
import FirstChild from "../../../components/ui/internal/FirstChild";
import Overlay from "../../../components/ui/internal/Overlay";
import {
  ImageViewer,
  ToolBar,
  ToolBarItem,
  Slider,
  IconButton,
  IconMenu,
  MenuItem,
  EditableText
} from "../../../components/ui/";
import {
  CloseIcon,
  CropIcon,
  StarIcon,
  ResizeIcon,
  MoreVertIcon
} from "../../../components/svg-icons/";

const b = bem("item-viewer-container");

export class ItemViewerContainer extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleClose() {
    this.props.dispatch(ItemActions.setCurrentItem(null));
  }

  render() {
    const {
      items,
      currentItem
    } = this.props;

    const show = !!currentItem;
    const modifier = { show };

    return (
      <ReactCSSTransitionGroup
        component={FirstChild}
        transitionName="item-viewer"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {show && <div className={b(modifier)()}>
          <div className={b("body")()}>
            <ToolBar
              className={b("toolbar")()}
              title={<EditableText text={currentItem.name} />}
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
                  <IconButton
                    icon={<StarIcon />}
                  />
                </ToolBarItem>,
                <ToolBarItem>
                  <IconMenu
                    icon={<IconButton icon={<MoreVertIcon />} />}
                    origin={{ vertical: "top", horizontal: "right" }}
                    triggerOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem text="移動" />
                    <MenuItem text="削除" />
                  </IconMenu>
                </ToolBarItem>,
              ]}
            />

            <Slider
              className={b("zoom")()}
              min={0.2}
              max={1.8}
              step={0.1}
              value={1}
            />

            <ImageViewer
              className={b("viewer")()}
              image={currentItem.thumbnail}
            />
          </div>

          <Overlay
            className={b("overlay")()}
            show={true}
            onClick={this.handleClose}
          />
        </div>}
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  state => ({
    items: state,
    currentItem: getCurrentItem(state)
  }),
  null,
  null,
  { pure: false }
)(ItemViewerContainer);
