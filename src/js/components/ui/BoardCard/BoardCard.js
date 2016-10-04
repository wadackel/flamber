// @flow
import autoBind from "auto-bind";
import moment from "moment";
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
  Label,
  FlatButton,
  IconButton
} from "../";
import {
  FilesIcon,
  TrashIcon
} from "../../svg-icons";
import type { BoardId } from "../../../types/board";
import type { GridLayout, ListLayout } from "../../../types/prop-types";

type Props = {
  className?: string;
  style?: Object;
  id: BoardId;
  processing: boolean;
  selected: boolean;
  title: string;
  image: string;
  layout: GridLayout | ListLayout;
  itemCount: number;
  lastUpdatedAt: Date;
  onClick?: Function;
  onSelect?: Function;
  onEdit?: Function;
  onDelete?: Function;
};

export default class BoardCard extends Component {
  props: Props;

  static defaultProps = {
    layout: Layout.GRID,
    processing: false,
    selected: false,
    itemCount: 0
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    autoBind(this);
  }

  handleClick() {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(this.props.id);
    }
  }

  handleSelectClick(e: SyntheticMouseEvent) {
    e.stopPropagation();
  }

  handleSelect() {
    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(this.props.id);
    }
  }

  handleEditClick(e: SyntheticMouseEvent) {
    e.stopPropagation();
    if (typeof this.props.onEdit === "function") {
      this.props.onEdit(this.props.id);
    }
  }

  handleDeleteClick(e: SyntheticMouseEvent) {
    e.stopPropagation();
    if (typeof this.props.onDelete === "function") {
      this.props.onDelete(this.props.id);
    }
  }

  renderMoreActions(): React$Element<any> {
    return (
      <IconButton icon={<TrashIcon />} tooltip="削除する" onClick={this.handleDeleteClick} />
    );
  }

  renderList(): React$Element<any> {
    const {
      className,
      style,
      processing,
      selected,
      title,
      image,
      itemCount,
      lastUpdatedAt
    } = this.props;

    const baseClassName = "board-card--list";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b({ selected })(), className)}
        style={style}
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
              Last updated {moment(lastUpdatedAt).format("YYYY.MM.DD")}
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")()}>
          <span className={b("label")()}><FilesIcon /> {itemCount}</span>
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

  renderGrid(): React$Element<any> {
    const {
      className,
      style,
      processing,
      selected,
      title,
      image,
      itemCount,
      lastUpdatedAt
    } = this.props;

    const baseClassName = "board-card";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={baseClassName}
        className={mergeClassNames(b({ selected })(), className)}
        style={style}
        processing={processing}
        onClick={this.handleClick}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          overlay={<CardOverlay
            baseClassName={baseClassName}
            selectable={true}
            selected={selected}
            moreActions={this.renderMoreActions()}
            actions={<FlatButton onClick={this.handleEditClick}>Edit board</FlatButton>}
            onClick={this.handleSelectClick}
            onSelect={this.handleSelect}
          />}
        >
          <Label className={b("label")()} icon={<FilesIcon />}>{itemCount}</Label>
        </CardMedia>
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            Last updated {moment(lastUpdatedAt).format("YYYY.MM.DD")}
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
