import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { IconButton } from "../";
import { TagIcon, TrashIcon } from "../../svg-icons/";

const b = bem("tag");

export default class Tag extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    onDelete: () => {}
  };

  constructor(props, context) {
    super(props, context);

    this.state = { hover: false };

    autoBind(this);
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleDeleteClick() {
    this.props.onDelete(this.props.value);
  }

  render() {
    const { className, label } = this.props;
    const { hover } = this.state;
    const modifier = { hover };

    return (
      <span
        className={mergeClassNames(b(modifier)(), className)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span className={b("icon", modifier)()}>
          <IconButton
            disable
            className={b("tag", modifier)()}
            size="xs"
            icon={<TagIcon />}
          />
          <IconButton
            className={b("trash", modifier)()}
            size="xs"
            icon={<TrashIcon />}
            onClick={this.handleDeleteClick}
          />
        </span>
        <span className={b("label", modifier)()}>{label}</span>
      </span>
    );
  }
}
