/* eslint-disable */
import assign from "object-assign";
import urlParse from "url-parse";
import React, { PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Card,
  CardAction,
  CardBody,
  CardCol,
  CardMedia,
  CardMore,
  CardOverlay,
  CardText,
  CardTitle
} from "../internal/Card/";
import {
  ColorBar,
  FlatButton,
  IconButton
} from "../";
import {
  StarIcon,
  TrashIcon
} from "../../svg-icons";

export default class ItemCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.oneOf([Layout.RANDOM_GRID, Layout.GRID, Layout.LIST]),
    style: PropTypes.object,
    selected: PropTypes.bool,
    href: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    colors: PropTypes.array,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
    onDelete: PropTypes.func,
    onDetailClick: PropTypes.func,
    onColorClick: PropTypes.func
  };

  static defaultProps = {
    layout: Layout.GRID,
    style: {},
    selected: false,
    onSelect: () => {},
    onFavorite: () => {},
    onDelete: () => {},
    onDetailClick: () => {},
    onColorClick: () => {}
  };

  constructor(props, context) {
    super(props, context);

    bindHandlers([
      "handleSelect",
      "handleFavoriteClick",
      "handleDetailClick",
      "handleDeleteClick"
    ], this);
  }

  handleFavoriteClick() {
    // TODO
  }

  handleDetailClick() {
    // TODO
  }

  handleSelect(value, checked) {
    this.props.onSelect(checked);
  }

  handleDeleteClick(e) {
    this.props.onDelete(this.props.id);
  }

  renderMoreActions() {
    return [
      <IconButton icon={<TrashIcon />} tooltip="Delete" onClick={this.handleDeleteClick} />
    ];
  }

  renderGrid(isRandomGrid) {
    const {
      className,
      style,
      selected,
      url,
      title,
      image,
      imageWidth,
      imageHeight,
      colors
    } = this.props;

    const baseClassName = "item-card" + (isRandomGrid ? "--random-grid" : "");
    const b = bem(baseClassName);
    const modifier = { selected };

    const parsedURL = urlParse(url, true);

    return (
      <Card
        baseClassName={mergeClassNames(b(modifier), className)}
        style={style}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          style={{
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`
          }}
          overlay={<CardOverlay
            baseClassName={baseClassName}
            selectable={true}
            selected={selected}
            moreActions={this.renderMoreActions()}
            actions={<FlatButton onClick={this.handleDetailClick}>Detail</FlatButton>}
            onSelect={this.handleSelect}
          />}
        />
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            <a href={url} target="_blank">{parsedURL.host}</a>
          </CardText>
          <CardAction baseClassName={baseClassName}>
            <IconButton icon={<StarIcon />} onClick={this.handleFavoriteClick} />
          </CardAction>
        </CardBody>
        <ColorBar
          className={b("colors")}
          palette={colors}
        />
      </Card>
    );
  }

  renderList() {
    const {
      className,
      style,
      selected,
      url,
      title,
      image,
      colors
    } = this.props;

    const baseClassName = "item-card--list";
    const b = bem(baseClassName);
    const modifier = { selected };

    const parsedURL = urlParse(url, true);

    return (
      <Card
        baseClassName={mergeClassNames(b(), className)}
        style={{}}
      >
        <CardCol baseClassName={baseClassName} className={b("col--media")}>
          <CardMedia
            baseClassName={baseClassName}
            image={image}
          />
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--body")}>
          <CardBody baseClassName={baseClassName}>
            <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
            <CardText baseClassName={baseClassName}>
              <a href={url} target="_blank">{parsedURL.host}</a>
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")}>
          <IconButton icon={<StarIcon />} tooltip="Favorite" onClick={this.handleFavoriteClick} />
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--more")}>
          <CardMore
            baseClassName={baseClassName}
            actions={this.renderMoreActions()}
          />
        </CardCol>
      </Card>
    );
  }

  render() {
    const { layout } = this.props;

    switch (layout) {
      case Layout.RANDOM_GRID:
        return this.renderGrid(true);
      case Layout.GRID:
        return this.renderGrid(false);
      case Layout.LIST:
        return this.renderList();
    }
  }
}
