/* eslint-disable */
import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const b = bem("card-media");

export default function CardMedia({
  className,
  image,
  overlay
}) {
  return (
    <div className={mergeClassNames(b(), className)}>
      {overlay && <div className={b("overlay")}>{overlay}</div>}
      {image && <div className={b("item")} style={{ backgroundImage: `url(${image})` }}></div>}
    </div>
  );
}

CardMedia.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  overlay: PropTypes.element
};
