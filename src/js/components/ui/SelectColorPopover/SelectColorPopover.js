import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Popover,
  FlatButton,
  SelectableColor,
  SelectableColorGroup
} from "../";

const b = bem("select-color-popover");

export default class SelectColorPopover extends Component {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    origin: OriginalPropTypes.origin,
    triggerElement: PropTypes.object,
    triggerOrigin: OriginalPropTypes.origin,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        borderColor: PropTypes.string,
        checkMarkColor: PropTypes.string
      })
    ),
    selectColors: PropTypes.arrayOf(PropTypes.string),
    onComplete: PropTypes.func,
    onRequestClose: PropTypes.func
  };

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
    selectColors: [],
    onComplete: () => {},
    onRequestClose: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectColors: props.selectColors
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({
        selectColors: nextProps.selectColors
      });
    }
  }

  handleColorClick(color) {
    const { selectColors } = this.state;
    const newSelectColors = selectColors.indexOf(color) > -1
      ? selectColors.filter(o => o !== color)
      : [...selectColors, color];

    this.setState({ selectColors: newSelectColors });
  }

  handleComplete() {
    this.props.onComplete(this.state.selectColors);
  }

  handleRequestClose() {
    this.props.onRequestClose();
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
            colors={colors}
            selectColors={selectColors}
            onColorClick={this.handleColorClick}
          >
            {colors.map(colorObj =>
              <SelectableColor {...colorObj} />
            )}
          </SelectableColorGroup>

          <FlatButton
            className={b("done")()}
            type="primary"
            onClick={this.handleComplete}
          >
            Done
          </FlatButton>
        </div>
      </Popover>
    );
  }
}
