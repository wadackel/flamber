import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";
import { Spinner } from "../";
import ImageLoader from "../internal/ImageLoader";

const b = bem("card-media");

export default function CardMedia({
  style,
  className,
  image,
  overlay
}) {
  return (
    <div className={mergeClassNames(b(), className)} style={style}>
      {overlay && <div className={b("overlay")}>{overlay}</div>}
      <ImageLoader
        background={true}
        preloader={<Spinner />}
      >
        <div
          className={b("item")}
          style={{ backgroundImage: `url(${image})` }}
        />
      </ImageLoader>
    </div>
  );
}

CardMedia.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  image: PropTypes.string,
  overlay: PropTypes.element
};
