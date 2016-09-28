import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { TextField } from "../";

const b = bem("text-field-group");

export default function TextFieldGroup({
  className,
  label,
  addonLeft,
  addonRight,
  ...props
}) {
  const modifier = { "has-label": !!label };

  if (label) {
    props.label = label;
  }

  return (
    <div className={mergeClassNames(b(modifier)(), className)}>
      {addonLeft &&
        <div className={b("addon", { ...modifier, left: true })()}>
          {addonLeft}
        </div>
      }
      <div className={b("control", modifier)()}>
        <TextField {...props} />
      </div>
      {addonRight &&
        <div className={b("addon", { ...modifier, right: true })()}>
          {addonRight}
        </div>
      }
    </div>
  );
}

TextFieldGroup.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  multiLine: PropTypes.bool,
  name: PropTypes.string,
  addonLeft: PropTypes.node,
  addonRight: PropTypes.node,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func
};
