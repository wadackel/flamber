// @flow
import React from "react";
import bem from "../../../../helpers/bem";
import ImageLoader from "../ImageLoader";
import { Spinner } from "../../";

type Props = {
  children: React$Element<any>;
  baseClassName: string;
  style?: Object;
  image: string;
  overlay?: React$Element<any>;
  selected: boolean;
};

export default function CardMedia(props: Props) {
  const {
    children,
    baseClassName,
    style,
    overlay,
    image,
    selected
  } = props;

  const b = bem(`${baseClassName}__media`);
  const modifier = { selected };

  return (
    <div
      className={b(modifier)()}
      style={style}
    >
      {overlay && <div className={b("overlay", modifier)()}>{overlay}</div>}
      <div className={b("item-wrapper", modifier)()}>
        <ImageLoader
          className={b("item", modifier)()}
          src={image}
          background={true}
          preloader={<Spinner className={b("spinner")()} />}
        />
      </div>
      {children}
    </div>
  );
}

CardMedia.defaultProps = {
  selected: false
};
