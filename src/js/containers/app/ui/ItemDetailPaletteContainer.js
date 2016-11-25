/* eslint-disable */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import palette from "../../../constants/palette";
import * as ItemActions from "../../../actions/items";
import bem from "../../../helpers/bem";
import { getCurrentItem } from "../../../selectors/items";
import {
  ColorBar,
  SelectColorPopover
} from "../../../components/ui/";

const b = bem("item-detail-palette-container");


// Make selectable color values
const paletteBoaders = {
  "#ffffff": "#bebebe"
};

const paletteCheckMarks = {
  "#ffffff": "#bebebe",
  "#fffc00": "#adab35"
};

const paletteColors = palette.map(color => {
  const b = paletteBoaders;
  const c = paletteCheckMarks;
  const obj = { color };
  if (b.hasOwnProperty(color)) obj.borderColor = b[color];
  if (c.hasOwnProperty(color)) obj.checkMarkColor = c[color];

  return obj;
});


export class ItemDetailPaletteContainer extends Component {
  state = {
    popoverOpen: false,
    popoverTriggerElement: null
  };

  handleColorBarClick = (e) => {
    e.stopPropagation();

    this.setState({
      popoverOpen: true,
      popoverTriggerElement: e.currentTarget
    });
  }

  handlePopoverComplete = (newPalette) => {
    const { dispatch, currentItem } = this.props;

    dispatch(ItemActions.updateItemPaletteRequest(
      currentItem.id,
      newPalette
    ));

    this.setState({ popoverOpen: false });
  }

  handlePopoverClose = () => {
    this.setState({ popoverOpen: false });
  }

  render() {
    const { currentItem } = this.props;
    const {
      popoverOpen,
      popoverTriggerElement
    } = this.state;

    if (!currentItem) return null;

    return (
      <div className={b()}>
        <ColorBar
          className={b("color-bar")()}
          palette={currentItem.palette}
          onClick={this.handleColorBarClick}
        />

        <SelectColorPopover
          className={b("select-color")()}
          open={popoverOpen}
          origin={{ vertical: "middle", horizontal: "center" }}
          triggerOrigin={{ vertical: "top", horizontal: "center" }}
          triggerElement={popoverTriggerElement}
          colors={paletteColors}
          selectColors={currentItem.palette}
          onComplete={this.handlePopoverComplete}
          onRequestClose={this.handlePopoverClose}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    currentItem: getCurrentItem(state)
  })
)(ItemDetailPaletteContainer);
