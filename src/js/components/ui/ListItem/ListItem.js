import autoBind from "auto-bind";
import React, { PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import Button from "../internal/Button";
import { TextField, IconButton } from "../";
import { PencilIcon, TrashIcon } from "../../svg-icons/";

const b = bem("list-item");

export default class ListItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    processing: PropTypes.bool,
    text: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.any,
    editable: PropTypes.bool,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onComplete: PropTypes.func,
    onRequestDelete: PropTypes.func
  };

  static defaultProps = {
    processing: false,
    editable: false,
    onClick: () => {},
    onChange: () => {},
    onEnter: () => {},
    onComplete: () => {},
    onRequestDelete: () => {}
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      text: props.text,
      isEditing: false
    };

    autoBind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isEditing === false && this.state.isEditing === true) {
      this.handleComplete();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isEditing === false && this.state.isEditing === true) {
      this.refs.control.focus();
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(this, this.props.value, this.props.index);
  }

  handleChange(e, text) {
    this.setState({ text });
    this.props.onChange(this, text, this.props.index);
  }

  handleEnter(e, text) {
    this.props.onEnter(this, text, this.props.index);
    this.refs.control.blur();
  }

  handleBlur() {
    this.setState({ isEditing: false });
  }

  handleComplete() {
    this.props.onComplete(this, this.state.text, this.props.index);
  }

  handleEditClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { isEditing } = this.state;

    if (isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  handleTrashClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestDelete(this, this.props.index);
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
      text,
      editable,
      placeholder
    } = this.props;

    const { isEditing } = this.state;

    const modifier = {
      "is-editing": isEditing,
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
        {isEditing
          ? <TextField
              ref="control"
              className={b("control")()}
              defaultValue={text}
              placeholder={placeholder}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onEnter={this.handleEnter}
            />
          : <Button
              ref="button"
              disable={processing}
              baseClassName={b("button")()}
              className={processing ? `${b("button")()}--processing` : ""}
              label={text}
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
          <MDSpinner
            className={b("processing-spinner")()}
            size={16}
          />
        }
      </div>
    );
  }
}
