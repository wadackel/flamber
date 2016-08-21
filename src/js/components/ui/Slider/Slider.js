import React, { PropTypes } from "react";
import RcSlider from "rc-slider";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("slider");

function Handle(props) {
  const style = { left: `${props.offset}%` };

  return <div className={b("handle", { dragging: props.dragging })} style={style} />;
}

Handle.propTypes = {
  offset: PropTypes.number,
  className: PropTypes.string,
  dragging: PropTypes.bool
};

export default function Slider({
  className,
  min,
  max,
  step,
  vertical,
  defaultValue,
  value,
  disabled,
  onChange
}) {
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

Slider.propTypes = {
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  vertical: PropTypes.bool,
  defaultValue: PropTypes.number.isRequired,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

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
