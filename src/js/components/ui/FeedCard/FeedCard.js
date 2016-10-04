// @flow
import autoBind from "auto-bind";
import urlParse from "url-parse";
import React, { Component } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import {
  Card,
  CardBody,
  CardCol,
  CardMedia,
  CardMore,
  CardOverlay,
  CardText,
  CardTitle
} from "../internal/Card/";
import {
  FlatButton,
  IconButton
} from "../";
import {
  LinkIcon,
  PlusIcon
} from "../../svg-icons/";
import type { GridLayout, ListLayout } from "../../../types/prop-types";

type Props = {
  className?: string;
  style?: Object;
  layout: GridLayout | ListLayout;
  url: string;
  site: string;
  favicon: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  onAddItem?: Function;
};

export default class FeedCard extends Component {
  props: Props;

  static defaultProps = {
    layout: Layout.GRID
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleAddItem() {
    // TODO
  }

  handleMouseLeave() {
    // TODO
  }

  handleDetailClick() {
    // TODO
  }

  renderList(): React$Element<any> {
    const {
      className,
      style,
      url,
      site,
      favicon,
      title,
      image
    } = this.props;

    const baseClassName = "feed-card--list";
    const b = bem(baseClassName);
    const parsedURL = urlParse(site, true);

    return (
      <Card
        baseClassName={mergeClassNames(b(), className)}
        style={style}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardCol baseClassName={baseClassName} className={b("col--media")()}>
          <CardMedia
            baseClassName={baseClassName}
            image={image}
          />
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--body")()}>
          <CardBody baseClassName={baseClassName}>
            <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
            <CardText baseClassName={baseClassName}>
              <a href={url} target="_blank">
                <img className={b("favicon")()} src={favicon} alt={parsedURL.host} />
                {parsedURL.host}
              </a>
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--more")()}>
          <CardMore
            baseClassName={baseClassName}
            actions={[
              <IconButton icon={<LinkIcon />} tooltip="Visit" onClick={this.handleDetailClick} />,
              <IconButton icon={<PlusIcon />} tooltip="Add item" onClick={this.handleAddItem} />
            ]}
          />
        </CardCol>
      </Card>
    );
  }

  renderGrid(): React$Element<any> {
    const {
      className,
      style,
      url,
      site,
      favicon,
      title,
      image,
      imageWidth,
      imageHeight
    } = this.props;

    const baseClassName = "feed-card";
    const b = bem(baseClassName);
    const parsedURL = urlParse(site, true);

    return (
      <Card
        baseClassName={mergeClassNames(b(), className)}
        style={style}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia
          baseClassName={baseClassName}
          style={{
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`
          }}
          image={image}
          overlay={<CardOverlay
            baseClassName={baseClassName}
            actions={[
              <FlatButton onClick={this.handleDetailClick}>Visit</FlatButton>,
              <FlatButton onClick={this.handleAddItem}>Add item</FlatButton>
            ]}
          />}
        />
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            <a href={url} target="_blank">
              <img className={b("favicon")()} src={favicon} alt={parsedURL.host} />
              {parsedURL.host}
            </a>
          </CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    const { layout } = this.props;

    switch (layout) {
      case Layout.GRID:
        return this.renderGrid();
      case Layout.LIST:
        return this.renderList();
    }
  }
}
