import _ from "lodash";
import autoBind from "auto-bind";
import urlParse from "url-parse";
import React, { PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
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
  StarFillIcon,
  FolderIcon,
  TrashIcon
} from "../../svg-icons";

export default class ItemCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.oneOf([Layout.RANDOM_GRID, Layout.GRID, Layout.LIST]),
    style: PropTypes.object,
    processing: PropTypes.bool,
    selected: PropTypes.bool,
    favorite: PropTypes.bool,
    id: PropTypes.any,
    url: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    colors: PropTypes.array,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
    onMove: PropTypes.func,
    onDelete: PropTypes.func,
    onDetailClick: PropTypes.func,
    onColorClick: PropTypes.func
  };

  static defaultProps = {
    layout: Layout.GRID,
    style: {},
    procssing: false,
    selected: false,
    favorite: false,
    onSelect: () => {},
    onFavorite: () => {},
    onMove: () => {},
    onDelete: () => {},
    onDetailClick: () => {},
    onColorClick: () => {}
  };

  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  handleFavoriteClick() {
    this.props.onFavorite(this.props.id);
  }

  handleDetailClick() {
    // TODO
  }

  handleSelect(value, checked) {
    this.props.onSelect(this.props.id, checked);
  }

  handleMoveClick() {
    this.props.onMove(this.props.id);
  }

  handleDeleteClick() {
    this.props.onDelete(this.props.id);
  }

  renderMoreActions() {
    return [
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />,
      <IconButton icon={<FolderIcon />} tooltip="移動する" onClick={this.handleMoveClick} />
    ];
  }

  renderGrid(isRandomGrid) {
    const {
      className,
      style,
      processing,
      selected,
      favorite,
      url,
      title,
      image,
      imageWidth,
      imageHeight,
      colors
    } = this.props;

    const baseClassName = `item-card${isRandomGrid ? "--random-grid" : ""}`;
    const b = bem(baseClassName);
    const modifier = { selected };

    const parsedURL = urlParse(url, true);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b(modifier)(), className)}
        style={style}
        processing={processing}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          selected={selected}
          style={isRandomGrid ? {
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`
          } : {}}
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
            <IconButton
              className={b("favorite", { active: favorite })()}
              icon={favorite ? <StarFillIcon /> : <StarIcon />}
              onClick={this.handleFavoriteClick}
            />
          </CardAction>
        </CardBody>
        <ColorBar
          className={b("colors")()}
          palette={colors}
        />
      </Card>
    );
  }

  renderList() {
    const {
      className,
      processing,
      selected,
      favorite,
      url,
      title,
      image
    } = this.props;

    const baseClassName = "item-card--list";
    const b = bem(baseClassName);
    const modifier = { selected };

    const parsedURL = urlParse(url, true);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b(modifier)(), className)}
        style={{}}
        processing={processing}
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
              <a href={url} target="_blank">{parsedURL.host}</a>
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")()}>
          <IconButton
            className={b("favorite", { active: favorite })()}
            icon={favorite ? <StarFillIcon /> : <StarIcon />}
            tooltip="スターを付ける"
            onClick={this.handleFavoriteClick}
          />
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--more")()}>
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
