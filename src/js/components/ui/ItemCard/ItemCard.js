import _ from "lodash";
import autoBind from "auto-bind";
import isURL from "validator/lib/isURL";
import urlParse from "url-parse";
import React, { PropTypes } from "react";
import * as Layout from "../../../constants/layouts";
import { hexToRgb } from "../../../helpers/color";
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
  IconButton,
  StarButton
} from "../";
import {
  FolderIcon,
  TrashIcon
} from "../../svg-icons";

export default class ItemCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.oneOf([Layout.GALLERY, Layout.GRID, Layout.LIST]),
    style: PropTypes.object,
    processing: PropTypes.bool,
    selected: PropTypes.bool,
    star: PropTypes.bool,
    id: PropTypes.any,
    url: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    colors: PropTypes.array,
    onSelect: PropTypes.func,
    onStar: PropTypes.func,
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
    star: false,
    onSelect: () => {},
    onStar: () => {},
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

  handleUrlClick(e) {
    e.stopPropagation();
  }

  handleStarClick(e) {
    e.stopPropagation();
    this.props.onStar(this.props.id);
  }

  handleDetailClick(e) {
    e.stopPropagation();
    this.props.onDetailClick(this.props.id);
  }

  handleSelect(value, checked) {
    this.props.onSelect(this.props.id, checked);
  }

  handleMoveClick(e) {
    e.stopPropagation();
    this.props.onMove(this.props.id);
  }

  handleDeleteClick(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }

  renderURL() {
    const { url } = this.props;

    return isURL(url, { require_protocol: true }) // eslint-disable-line camelcase
      ? <a href={url} target="_blank" onClick={this.handleUrlClick}>{urlParse(url, true).host}</a>
      : <span>{url}</span>;
  }

  renderMoreActions() {
    return [
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />,
      <IconButton icon={<FolderIcon />} tooltip="移動する" onClick={this.handleMoveClick} />
    ];
  }

  renderGrid(isGallery) {
    const {
      className,
      style,
      processing,
      selected,
      star,
      title,
      image,
      imageWidth,
      imageHeight,
      colors
    } = this.props;

    const baseClassName = `item-card${isGallery ? "--gallery" : ""}`;
    const b = bem(baseClassName);
    const modifier = { selected };
    const firstHEX = colors ? colors[0] : "#fff";
    const firstRGB = hexToRgb(firstHEX) || {};

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b(modifier)(), className)}
        style={style}
        processing={processing}
        onClick={this.handleDetailClick}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          selected={selected}
          style={isGallery ? {
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`,
            backgroundColor: `rgb(${firstRGB.r}, ${firstRGB.g}, ${firstRGB.b})`
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
            {this.renderURL()}
          </CardText>
          <CardAction baseClassName={baseClassName}>
            <StarButton
              className={b("star")()}
              active={star}
              tooltip={star ? "スターを外す" : "スターを付ける"}
              onClick={this.handleStarClick}
            />
          </CardAction>
        </CardBody>
        <ColorBar
          selectable
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
      star,
      title,
      image
    } = this.props;

    const baseClassName = "item-card--list";
    const b = bem(baseClassName);
    const modifier = { selected };

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
              {this.renderURL()}
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")()}>
          <StarButton
            className={b("star")()}
            active={star}
            tooltip={star ? "スターを外す" : "スターを付ける"}
            onClick={this.handleStarClick}
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
      case Layout.GALLERY:
        return this.renderGrid(true);
      case Layout.GRID:
        return this.renderGrid(false);
      case Layout.LIST:
        return this.renderList();
    }
  }
}
