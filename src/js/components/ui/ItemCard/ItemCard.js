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
  CardTitle,
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

    this.state = {
      showMore: false
    };

    bindHandlers([
      "handleMouseLeave",
      "handleSelect",
      "handleFavoriteClick",
      "handleDetailClick",
      "handleMoreClick",
      "handleMoreActionsMouseLeave",
      "handleDeleteClick"
    ], this);
  }

  handleMouseLeave() {
    this.setState({ showMore: false });
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

  handleMoreClick() {
    this.setState({ showMore: true });
  }

  handleMoreActionsMouseLeave() {
    this.setState({ showMore: false });
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

    const { showMore } = this.state;

    const parsedURL = urlParse(url, true);

    const modifier = {
      selected,
      "show-more": showMore
    };

    return (
      <Card
        className={mergeClassNames(b(modifier), className)}
        style={style}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia
          className={b("media")}
          image={image}
          overlay={<CardOverlay
            selectable={true}
            selected={selected}
            moreActions={<IconButton icon={<TrashIcon />} onClick={this.handleDeleteClick} />}
            actions={<FlatButton onClick={this.handleDetailClick}>Detail</FlatButton>}
            onSelect={this.handleSelect}
          />}
        />
        <CardBody className={b("body")}>
          <CardTitle className={b("title")}>{title}</CardTitle>
          <CardText className={b("text")}>
            <a href={url} target="_blank">{parsedURL.host}</a>
          </CardText>
          <CardAction className={b("action")}>
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
