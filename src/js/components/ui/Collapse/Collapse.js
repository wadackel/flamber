// @flow
import React from "react";
import ReactCollapse from "react-collapse";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { CircleBottomIcon } from "../../svg-icons/";

const b = bem("collapse");


type Props = {
  children: React$Element<any>;
  className?: string;
  open: boolean;
  label: string;
  onToggle: ?Function;
};

export default function Collapse(props: Props) {
  const {
    children,
    className,
    open,
    label,
    onToggle
  } = props;

  const modifier = { open };

  return (
    <div className={mergeClassNames(b(modifier)(), className)}>
      <button
        className={b("header", modifier)()}
        type="button"
        onClick={onToggle}
      >
        <span className={b("label")()}>{label}</span>
        <span className={b("icon", modifier)()}><CircleBottomIcon /></span>
      </button>
      <ReactCollapse
        className={b("body")()}
        isOpened={open}
        springConfig={{
          stiffness: 170,
          damping: 26
        }}
      >
        {children}
      </ReactCollapse>
    </div>
  );
}

Collapse.defaultProps = {
  open: false
};
