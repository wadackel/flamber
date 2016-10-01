// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";
import { TextField, IconButton, Spinner } from "../";
import { PencilIcon, TrashIcon } from "../../svg-icons/";

const b = bem("list-item");

type Props = {
  className?: string;
  style?: Object;
  processing: boolean;
  primary: string;
  secondary?: string;
  icon?: React$Element<any>;
  index: number;
  value?: any;
  placeholder?: string;
  clickable: boolean;
  editable: boolean;
  meta?: React$Element<any>;
  onClick?: Function;
  onChange?: Function;
  onEnter?: Function;
  onComplete?: Function;
  onDelete?: Function;
};

type State = {
  primary: string;
  isEditing: boolean;
};

export default class ListItem extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    processing: false,
    clickable: true,
    editable: false,
    onClick: () => {},
    onChange: () => {},
    onEnter: () => {},
    onComplete: () => {},
    onRequestDelete: () => {}
  }

  constructor(props: Props, context: Object) {
    super(props, context);

    this.state = {
      primary: props.primary,
      isEditing: false
    };

    autoBind(this);
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.isEditing === false && this.state.isEditing === true) {
      this.handleComplete();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.isEditing === false && this.state.isEditing === true) {
      this.refs.control.focus();
    }
  }

  handleClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this, this.props.value, this.props.index);
    }
  }

  handleChange(e: SyntheticInputEvent, primary: string) {
    this.setState({ primary });
    if (typeof this.props.onChange === "function") {
      this.props.onChange(this, primary, this.props.index);
    }
  }

  handleEnter(e: SyntheticInputEvent, primary: string) {
    if (typeof this.props.onEnter === "function") {
      this.props.onEnter(this, primary, this.props.index);
    }
    this.refs.control.blur();
  }

  handleBlur() {
    this.setState({ isEditing: false });
  }

  handleComplete() {
    if (typeof this.props.onComplete === "function") {
      this.props.onComplete(this, this.state.primary, this.props.index);
    }
  }

  handleEditClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleTrashClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this, this.props.index);
    }
  }

  applyFocus() {
    const { button } = this.refs;

    if (button) {
      button.focus();
    }
  }

  render() {
    const {
      className,
      style,
      processing,
      primary,
      secondary,
      icon,
      clickable,
      editable,
      placeholder,
      meta
    } = this.props;

    const { isEditing } = this.state;

    const modifier = {
      "is-editing": isEditing,
      clickable,
      editable,
      processing
    };

    return (
      <div className={mergeClassNames(b(modifier)(), className)} style={style}>
        {(!processing && editable) &&
          <IconButton
            className={b("icon", { edit: true })()}
            icon={<PencilIcon />}
            onClick={this.handleEditClick}
          />
        }
        {(!editable && icon) &&
          React.cloneElement(icon, { className: b("user-icon") })
        }
        {isEditing
          ? <TextField
              ref="control"
              className={b("control")()}
              defaultValue={primary}
              placeholder={placeholder}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onEnter={this.handleEnter}
            />
          : <Button
              ref="button"
              disable={!clickable || processing}
              baseClassName={b("button")()}
              className={processing ? `${b("button")()}--processing` : ""}
              label={<span>
                <span className={b("primary")()}>{primary}</span>
                {secondary ? <span className={b("secondary")()}>{secondary}</span> : null}
              </span>}
              onClick={this.handleClick}
            />
        }
        {(!processing && editable) &&
          <IconButton
            className={b("icon", { trash: true })()}
            icon={<TrashIcon />}
            onClick={this.handleTrashClick}
          />
        }
        {processing &&
          <Spinner
            className={b("processing-spinner")()}
            size={16}
          />
        }
        {meta}
      </div>
    );
  }
}
