// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton, SelectColorPopover } from "../";
import { ColorMenuIcon } from "../../svg-icons/";
import type { Origin } from "../../../types/prop-types";
import type { SelectableColorValue } from "../SelectColorPopover/SelectColorPopover";

const b = bem("color-menu");

type Props = {
  className?: string;
  colors: Array<SelectableColorValue>;
  selectColors: Array<string>;
  origin: Origin;
  triggerOrigin: Origin;
  onComplete?: Function;
};

type State = {
  open: boolean;
  triggerElement: ?HTMLElement;
};

export default class SelectColorMenu extends Component {
  props: Props;
  state: State = {
    open: false,
    triggerElement: null
  };

  handleIconClick = (e: SyntheticMouseEvent) => {
    e.preventDefault();
    this.setState({
      open: true,
      triggerElement: e.currentTarget instanceof HTMLElement ? e.currentTarget : null
    });
  }

  handleComplete = (colors: Array<string>) => {
    this.setState({ open: false });
    if (typeof this.props.onComplete === "function") {
      this.props.onComplete(colors);
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    const {
      className,
      origin,
      triggerOrigin,
      colors,
      selectColors
    } = this.props;

    const {
      open,
      triggerElement
    } = this.state;

    return (
      <div className={mergeClassNames(b(), className)}>
        <IconButton
          icon={<ColorMenuIcon />}
          onClick={this.handleIconClick}
        />
        <SelectColorPopover
          open={open}
          origin={origin}
          triggerOrigin={triggerOrigin}
          triggerElement={triggerElement}
          colors={colors}
          selectColors={selectColors}
          onComplete={this.handleComplete}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
