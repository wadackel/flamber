import urlParse from "url-parse";
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

  constructor(props) {
    super(props);

    bindHandlers([
      "handleAddItem"
    ], this);
  }

  handleAddItem() {
    // TODO
  }

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

    const parsedURL = urlParse(site, true);

    return (
      <Card
        className={mergeClassNames(b(), className)}
        style={style}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardMedia
          className={b("media")}
          style={{
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`
          }}
          image={image}
          overlay={<CardOverlay
            actions={[
              <FlatButton className={b("visit")} onClick={this.handleDetailClick}>Visit</FlatButton>,
              <FlatButton className={b("add")} onClick={this.handleAddItem}>Add item</FlatButton>
            ]}
          />}
        />
        <CardBody className={b("body")}>
          <CardTitle className={b("title")}>{title}</CardTitle>
          <CardText className={b("text")}>
            <a href={url} target="_blank">
              <img className={b("favicon")} src={favicon} alt={parsedURL.host} />
              {parsedURL.host}
            </a>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}
