/* eslint-disable */
import assign from "object-assign";
import urlParse from "url-parse";
import moment from "moment";
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
  CardOverlay,
  CardText,
  CardTitle,
} from "../internal/Card/";
import {
  Checkbox,
  ColorBar,
  Label,
  FlatButton
} from "../";
import {
  FilesIcon,
  TrashIcon
} from "../../svg-icons";

export default class BoardCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    layout: PropTypes.oneOf([Layout.GRID, Layout.LIST]),
    itemCount: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    layout: Layout.GRID,
    selected: false,
    itemCount: 0,
    onSelect: () => {},
    onEdit: () => {},
    onDelete: () => {}
  };

  constructor(props) {
    super(props);

    bindHandlers([
      "handleSelect",
      "handleEditClick",
      "handleDeleteClick"
    ], this);
  }

  handleSelect(value, checked) {
    this.props.onSelect(checked);
  }

  handleEditClick() {
    // TODO
  }

  handleDeleteClick() {
    // TODO
  }

  renderList() {
    const {
      className,
      style,
      selected,
      title,
      image,
      itemCount,
      lastModified
    } = this.props;

    const baseClassName = "board-card--list";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={mergeClassNames(b({ selected }), className)}
        style={style}
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
              Last updated {moment(lastModified).format("YYYY.MM.DD")}
            </CardText>
          </CardBody>
        </CardCol>
        <CardCol baseClassName={baseClassName} className={b("col--meta")}>
          <span className={b("label")}><FilesIcon /> {itemCount}</span>
        </CardCol>
      </Card>
    );
  }

  renderGrid() {
    const {
      className,
      style,
      selected,
      title,
      image,
      itemCount,
      lastModified
    } = this.props;

    const baseClassName = "board-card";
    const b = bem(baseClassName);

    return (
      <Card
        baseClassName={mergeClassNames(b({ selected }), className)}
        style={style}
      >
        <CardMedia
          baseClassName={baseClassName}
          image={image}
          overlay={<CardOverlay
            baseClassName={baseClassName}
            selectable={true}
            selected={selected}
            moreActions={<IconButton icon={<TrashIcon />} onClick={this.handleDeleteClick} />}
            actions={<FlatButton onClick={this.handleEditClick}>Edit board</FlatButton>}
            onSelect={this.handleSelect}
          />}
        >
          <Label className={b("label")} icon={<FilesIcon />}>{itemCount}</Label>
        </CardMedia>
        <CardBody baseClassName={baseClassName}>
          <CardTitle baseClassName={baseClassName}>{title}</CardTitle>
          <CardText baseClassName={baseClassName}>
            Last updated {moment(lastModified).format("YYYY.MM.DD")}
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
