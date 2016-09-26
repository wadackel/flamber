import autoBind from "auto-bind";
import React, { Component, PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ListItem, IconButton } from "../";
import { ExternalLinkIcon, CloseIcon } from "../../svg-icons/";

const b = bem("feed-list-item");

export default class FeedListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.any,
    name: PropTypes.node,
    url: PropTypes.node,
    onDelete: PropTypes.func
  };

  static defaultProps = {
    onDelete: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleDeleteClick() {
    this.props.onDelete(this, this.props.value, this.props.index);
  }

  render() {
    const {
      className,
      name,
      url,
      onDelete, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <ListItem
      {...props}
      className={mergeClassNames(b(), className)}
      primary={name}
      secondary={<a href={url} target="_blank">{url}</a>}
      clickable={false}
      meta={
        <ul className={b("meta")()}>
          <li className={b("meta__item")()}>
            <IconButton
              icon={<ExternalLinkIcon />}
              href={url}
              target="_blank"
            />
          </li>
          <li className={b("meta__item")()}>
            <IconButton
              icon={<CloseIcon />}
              onClick={this.handleDeleteClick}
            />
          </li>
        </ul>
      }
    />;
  }
}
