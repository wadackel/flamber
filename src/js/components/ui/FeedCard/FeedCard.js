import urlParse from "url-parse";
import React, { PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
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

export default class FeedCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    layout: PropTypes.oneOf([Layout.GRID, Layout.LIST]),
    url: PropTypes.string,
    site: PropTypes.string,
    favicon: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    onAddItem: PropTypes.func
  };

  static defaultProps = {
    layout: Layout.GRID,
    style: {},
    onAddItem: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleAddItem"
    ], this);
  }

  handleAddItem() {
    // TODO
  }

  renderList() {
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

  renderGrid() {
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
