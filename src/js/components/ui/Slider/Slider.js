// @flow
import React, { Component } from "react";
import RcSlider from "rc-slider";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("slider");


type HandleProps = {
  offset?: number;
  dragging?: boolean;
};

class Handle extends Component {
  props: HandleProps;

  render() {
    const { offset, dragging } = this.props;
    const style = { left: `${offset ? offset : 0}%` };

    return <div className={b("handle", { dragging })} style={style} />;
  }
}


type Props = {
  className?: string;
  min: number;
  max: number;
  step: number;
  vertical: boolean;
  defaultValue?: number;
  value?: number;
  disabled: boolean;
  onChange?: Function;
};

export default function Slider(props: Props) {
  const {
    className,
    min,
    max,
    step,
    vertical,
    defaultValue,
    value,
    disabled,
    onChange
  } = props;

  return <RcSlider
    className={mergeClassNames(b(), className)}
    handle={<Handle />}
    min={min}
    max={max}
    step={step}
    vertical={vertical}
    value={value}
    defaultValue={defaultValue}
    disabled={disabled}
    onChange={onChange}
  />;
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  vertical: false,
  defaultValue: 0,
  value: 0,
  disabled: false,
  onChange: () => {}
};
