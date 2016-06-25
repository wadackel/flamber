import urlParse from "url-parse";
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import bindHandlers from "../../../helpers/bind-handlers";
import {
  Card,
  CardAction,
  CardBody,
  CardMedia,
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

const b = bem("item-card");

export default class ItemCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.bool,
    href: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    colors: PropTypes.array,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
    onDelete: PropTypes.func,
    onDetailClick: PropTypes.func,
    onColorClick: PropTypes.func
  };

  static defaultProps = {
    style: {},
    selected: false,
    onSelect: () => {},
    onFavorite: () => {},
    onDelete: () => {},
    onDetailClick: () => {},
    onColorClick: () => {}
  };

  constructor(props) {
    super(props);

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

  handleDeleteClick() {
    // TODO
  }

  render() {
    const {
      className,
      style,
      selected,
      url,
      title,
      image,
      colors
    } = this.props;

    const parsedURL = urlParse(url, true);

    const modifier = { selected };

    return (
      <Card
        baseClassName={mergeClassNames(b(modifier), className)}
        style={style}
      >
        <CardMedia
          baseClassName={b("media")}
          image={image}
          overlay={<CardOverlay
            baseClassName={b("overlay")}
            selectable={true}
            selected={selected}
            moreActions={<IconButton icon={<TrashIcon />} onClick={this.handleDeleteClick} />}
            actions={<FlatButton onClick={this.handleDetailClick}>Detail</FlatButton>}
            onSelect={this.handleSelect}
          />}
        />
        <CardBody baseClassName={b("body")}>
          <CardTitle baseClassName={b("title")}>{title}</CardTitle>
          <CardText baseClassName={b("text")}>
            <a href={url} target="_blank">{parsedURL.host}</a>
          </CardText>
          <CardAction baseClassName={b("action")}>
            <IconButton icon={<StarIcon />} onClick={this.handleCilck} />
          </CardAction>
        </CardBody>
        <ColorBar
          className={b("colors")}
          palette={colors}
        />
      </Card>
    );
  }
}
