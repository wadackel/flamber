/* eslint-disable */
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
  CardText,
  CardTitle,
  Checkbox,
  FlatButton,
  IconButton
} from "../";
import {
  MoreVertIcon,
  StarIcon
} from "../../svg-icons";

const b = bem("item-card");

export default class ItemCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.string,
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
      "handleFavorite",
      "handleDetailClick"
    ], this);
  }

  handleFavorite() {
    // TODO
  }

  handleDetailClick() {
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

    // TODO: More items
    const overlay = <div className={b("overlay")}>
      <Checkbox className={b("checkbox")} checked={selected} />
      <IconButton className={b("more")} icon={<MoreVertIcon />} />
      <FlatButton className={b("detail")} onClick={this.handleDetailClick}>Detail</FlatButton>
    </div>;

    const parsedURL = urlParse(url, true);

    return (
      <Card
        className={mergeClassNames(b({ selected }), className)}
        style={style}
      >
        <CardMedia
          className={b("media")}
          image={image}
          overlay={overlay}
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
        {/* TODO: colors */}
      </Card>
    );
  }
}
