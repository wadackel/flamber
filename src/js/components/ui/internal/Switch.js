// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import randomId from "../../../helpers/random-id";
import Ripple from "../internal/Ripple";

export type RadioProps = {
  className?: string;
  style?: Object;
  name?: string;
  label?: string;
  value?: any;
  checked: boolean;
  inline: boolean;
  onCheck?: Function;
  onClick?: Function;
};

export type CheckboxProps = $All<RadioProps, {
  indeterminate: boolean;
}>;

export type SwitchProps = $All<CheckboxProps, {
  baseClassName: string;
  type: "checkbox" | "radio";
}>;

type State = {
  ripples: Array<React$Element<any>>;
};

export default class Checkbox extends Component {
  props: SwitchProps;
  state: State;

  static defaultProps = {
    checked: false,
    indeterminate: false,
    inline: false
  };

  constructor(props: SwitchProps, context: Object) {
    super(props, context);

    this.state = {
      ripples: []
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps: SwitchProps) {
    if (nextProps.checked !== this.props.checked && nextProps.checked) {
      const b = bem(this.props.baseClassName);
      const { ripples } = this.state;

      this.setState({
        ripples: ripples.concat([
          <Ripple
            key={randomId()}
            className={b("ripple")()}
            onRequestHide={this.handleRippleHide}
          />
        ])
      });
    }
  }

  handleChange(e: SyntheticInputEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onCheck === "function") {
      this.props.onCheck(this.props.value, !this.props.checked);
    }
  }

  handleRippleHide() {
    const ripples = this.state.ripples.slice(1);
    this.setState({ ripples });
  }

  render() {
    const {
      baseClassName,
      className,
      style,
      type,
      label,
      name,
      value,
      checked,
      indeterminate,
      inline,
      onClick
    } = this.props;

    const { ripples } = this.state;

    const modifier = {
      checked,
      indeterminate,
      inline
    };

    const b = bem(baseClassName);

    return (
      <div className={mergeClassNames(b(modifier)(), className)} style={style}>
        <input
          ref={type}
          type={type}
          className={b("input", modifier)()}
          name={name}
          value={value}
          checked={checked}
          onChange={this.handleChange}
          onClick={onClick}
        />
        <div className={b("body")()}>
          <span className={b(type, modifier)()}>
            {ripples}
          </span>
          <span className={b("label", modifier)()}>{label}</span>
        </div>
      </div>
    );
  }
}
