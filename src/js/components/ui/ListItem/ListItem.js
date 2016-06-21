import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import Button from "../internal/Button";
import { TextField, IconButton } from "../";
import { PencilIcon, TrashIcon } from "../../svg-icons/";

const b = bem("list-item");

export default class ListItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    text: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.any,
    editable: PropTypes.bool,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    onRequestDelete: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    onClick: () => {},
    onChange: () => {},
    onComplete: () => {},
    onRequestDelete: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      isEditing: false
    };

    bindHandlers([
      "handleClick",
      "handleChange",
      "handleBlur",
      "handleComplete",
      "handleEditClick",
      "handleTrashClick"
    ], this);
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

  render() {
    const {
      className,
      style,
      text,
      editable,
      placeholder
    } = this.props;

    const {
      isEditing
    } = this.state;

    return (
      <div className={mergeClassNames(b({ "is-editing": isEditing, editable }), className)} style={style}>
        {editable &&
          <IconButton
            className={b("icon", { edit: true })}
            icon={<PencilIcon />}
            onClick={this.handleEditClick}
          />
        }
        {isEditing
          ? <TextField
              ref="control"
              className={b("control")}
              defaultValue={text}
              placeholder={placeholder}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          : <Button
              baseClassName="list-item__button"
              label={text}
              onClick={this.handleClick}
            />
        }
        {editable &&
          <IconButton
            className={b("icon", { trash: true })}
            icon={<TrashIcon />}
            onClick={this.handleTrashClick}
          />
        }
      </div>
    );
  }
}
