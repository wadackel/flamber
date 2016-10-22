// @flow
import autoBind from "auto-bind";
import React, { Component } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { ListItem, IconButton } from "../";
import { ExternalLinkIcon, CloseIcon } from "../../svg-icons/";

const b = bem("feed-list-item");

type Props = {
  className?: string;
  processing?: boolean;
  index: number;
  value: any;
  name: React$Element<any>;
  url: React$Element<any>;
  onDelete?: Function;
};

export default class FeedListItem extends Component {
  props: Props;

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleDeleteClick() {
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this, this.props.value, this.props.index);
    }
  }

  render() {
    const {
      className,
      name,
      url,
      processing, // eslint-disable-line no-unused-vars
      onDelete, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <ListItem
      {...props}
      processing={processing}
      className={mergeClassNames(b(), className)}
      primary={name}
      secondary={<a href={url} target="_blank">{url}</a>}
      clickable={false}
      meta={
        <ul className={b("meta", { processing })()}>
          <li className={b("meta__item")()}>
            <IconButton
              icon={<ExternalLinkIcon />}
              href={url}
              target="_blank"
            />
          </li>
          {!processing && <li className={b("meta__item")()}>
            <IconButton
              icon={<CloseIcon />}
              onClick={this.handleDeleteClick}
            />
          </li>}
        </ul>
      }
    />;
  }
}
