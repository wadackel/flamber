// @flow
import React from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { TextField } from "../";

const b = bem("text-field-group");

export default function TextFieldGroup(props: {
  className: ?string,
  label: ?string,
  addonLeft: ?React$Element<any>,
  addonRight: ?React$Element<any>
}) {
  const {
    className,
    label,
    addonLeft,
    addonRight,
    ...textFieldProps
  } = props;

  const modifier = { "has-label": !!label };

  if (label) {
    textFieldProps.label = label;
  }

  return (
    <div className={mergeClassNames(b(modifier)(), className)}>
      {addonLeft &&
        <div className={b("addon", { ...modifier, left: true })()}>
          {addonLeft}
        </div>
      }
      <div className={b("control", modifier)()}>
        <TextField {...textFieldProps} />
      </div>
      {addonRight &&
        <div className={b("addon", { ...modifier, right: true })()}>
          {addonRight}
        </div>
      }
    </div>
  );
}
