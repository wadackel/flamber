/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import bindHandlers from "../../../helpers/bind-handlers";
import Button from "../internal/Button";
import { IconButton } from "../";
import PencilIcon from "../../svg-icons/PencilIcon";
import TrashIcon from "../../svg-icons/TrashIcon";

const b = bem("list-item");

export default class ListItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.any,
    editable: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onRequestDelete: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    onClick: () => {},
    onChange: () => {},
    onRequestDelete: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {};

    bindHandlers([
      "handleClick",
      "handleChange",
      "handleEditClick",
      "handleTrashClick"
    ], this);
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(e, this.props.value);
  }

  handleChange() {
    // TODO
  }

  handleEditClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // TODO
  }

  handleTrashClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // TODO
  }

  render() {
    const {
      className,
      text,
      editable,
      onClick
    } = this.props;

    const editableProps = editable
      ? {
          icon: <IconButton className={b("edit")} icon={<PencilIcon />} onClick={this.handleEditClick} />,
          iconRight: <IconButton className={b("trash")} icon={<TrashIcon />} onClick={this.handleTrashClick} />
        }
      : {};

    return (
      <Button
        baseClassName="list-item"
        className={className}
        label={text}
        onClick={onClick}
        {...editableProps}
      />
    );
  }
}
