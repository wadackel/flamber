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
  ColorBar,
  FlatButton
} from "../";

const b = bem("feed-card");

export default class FeedCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    url: PropTypes.string,
    site: PropTypes.string,
    favicon: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    onAddItem: PropTypes.func
  };

  static defaultProps = {
    style: {},
    onAddItem: () => {}
  };

  render() {
    const {
      className,
      style,
      url,
      site,
      favicon,
      title,
      image,
      imageWidth,
      imageHeight
    } = this.props;

    // TODO
    const overlay = null;
    const parsedURL = {};

    return (
      <Card
        className={mergeClassNames(b(), className)}
        style={style}
        onMouseLeave={this.handleMouseLeave}
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
        </CardBody>
      </Card>
    );
  }
}
