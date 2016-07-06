/* eslint-disable */
import assign from "object-assign";
import urlParse from "url-parse";
import moment from "moment";
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Card,
  CardBody,
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

const b = bem("board-card");

export default class BoardCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    itemCount: PropTypes.number,
    lastModified: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    style: {},
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

  render() {
    const {
      className,
      style,
      selected,
      title,
      image,
      itemCount,
      lastModified
    } = this.props;

    const baseClassName = b();

    return (
      <Card
        baseClassName={mergeClassNames(baseClassName, className)}
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
}
