// @flow
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Popover,
  FlatButton,
  SelectableColor,
  SelectableColorGroup
} from "../";
import type { Origin } from "../../../types/prop-types";

const b = bem("select-color-popover");

export type SelectableColorValue = {
  color: string;
  borderColor: string;
  checkMarkColor: string;
};

type Props = {
  className?: string;
  open: boolean;
  origin: Origin;
  triggerElement: ?HTMLElement;
  triggerOrigin: Origin;
  colors: Array<SelectableColorValue>;
  selectColors: Array<string>;
  onComplete?: Function;
  onRequestClose?: Function;
};

type State = {
  selectColors: Array<string>;
};

export default class SelectColorPopover extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    open: false,
    origin: {
      vertical: "top",
      horizontal: "center"
    },
    triggerOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    selectColors: []
  };

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      selectColors: props.selectColors
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        selectColors: nextProps.selectColors
      });
    }
  }

  handleColorClick = (color: string) => {
    const { selectColors } = this.state;
    const newSelectColors = selectColors.indexOf(color) > -1
      ? selectColors.filter(o => o !== color)
      : [...selectColors, color];

    this.setState({ selectColors: newSelectColors });
  }

  handleComplete = () => {
    this.callComplete(this.state.selectColors);
  }

  handleClear = () => {
    this.callComplete([]);
  }

  handleRequestClose = () => {
    if (typeof this.props.onRequestClose === "function") {
      this.props.onRequestClose();
    }
  }

  callComplete(colors: Array<string>) {
    if (typeof this.props.onComplete === "function") {
      this.props.onComplete(colors);
    }
  }

  render() {
    const {
      className,
      open,
      origin,
      triggerElement,
      triggerOrigin,
      colors
    } = this.props;

    const { selectColors } = this.state;
    const hasColor = selectColors.length > 0;

    return (
      <Popover
        className={mergeClassNames(b(), className)}
        open={open}
        origin={origin}
        triggerElement={triggerElement}
        triggerOrigin={triggerOrigin}
        onRequestClose={this.handleRequestClose}
      >
        <div className={b("body")()}>
          <SelectableColorGroup
            className={b("color-group")()}
            colors={colors}
            selectColors={selectColors}
            onColorClick={this.handleColorClick}
          >
            {open && colors.map(obj =>
              <SelectableColor key={obj.color} {...obj} />
            )}
          </SelectableColorGroup>

          <FlatButton
            className={b("btn")()}
            type="primary"
            onClick={this.handleComplete}
          >
            Done
          </FlatButton>

          <FlatButton
            className={b("btn")()}
            disable={!hasColor}
            type="primary"
            onClick={this.handleClear}
          >
            Clear
          </FlatButton>
        </div>
      </Popover>
    );
  }
}
