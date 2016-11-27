// @flow
import _ from "lodash";
import isURL from "validator/lib/isURL";
import urlParse from "url-parse";
import React from "react";
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
import type { ItemId } from "../../../types/item";
import type {
  GalleryLayout,
  GridLayout,
  ListLayout,
  Colors
} from "../../../types/prop-types";

type Props = {
  className?: string;
  style?: Object;
  layout: GalleryLayout | GridLayout | ListLayout;
  processing: boolean;
  star: boolean;
  selectable: boolean;
  selected: boolean;
  id: ItemId;
  url: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  colors: Colors;
  onSelect?: Function;
  onStar?: Function;
  onMove?: Function;
  onDelete?: Function;
  onClick?: Function;
  onColorClick?: Function;
};

export default class ItemCard extends React.Component {
  props: Props;

  static defaultProps = {
    layout: Layout.GRID,
    procssing: false,
    selectable: false,
    selected: false,
    star: false
  };

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  handleUrlClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
  }

  handleStarClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onStar === "function") {
      this.props.onStar(this.props.id);
    }
  }

  handleClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props.id);
    }
  }

  handleSelect = (value: any, checked: boolean) => {
    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(this.props.id, checked);
    }
  }

  handleMoveClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onMove === "function") {
      this.props.onMove(this.props.id);
    }
  }

  handleDeleteClick = (e: SyntheticMouseEvent) => {
    e.stopPropagation();
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this.props.id);
    }
  }

  renderURL(): React$Element<any> {
    const { url } = this.props;

    return isURL(url, { require_protocol: true }) // eslint-disable-line camelcase
      ? <a href={url} target="_blank" onClick={this.handleUrlClick}>{urlParse(url, true).host}</a>
      : <span>{url}</span>;
  }

  renderMoreActions(): ?Array<React$Element<any>> {
    return this.props.selectable ? null : [
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />,
      <IconButton icon={<FolderIcon />} tooltip="移動する" onClick={this.handleMoveClick} />
    ];
  }

  renderGrid(isGallery: boolean): React$Element<any> {
    const {
      className,
      style,
      processing,
      selectable,
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
        onClick={this.handleClick}
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
            actions={!selectable ? <FlatButton onClick={this.handleClick}>Detail</FlatButton> : null}
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
              disable={selectable}
              tooltip={star ? "スターを外す" : "スターを付ける"}
              onClick={this.handleStarClick}
            />
          </CardAction>
        </CardBody>
        <ColorBar
          itemClickable={!selectable}
          className={b("colors")()}
          palette={colors}
        />
      </Card>
    );
  }

  renderList(): React$Element<any> {
    const {
      className,
      processing,
      selectable,
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
            disable={selectable}
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
