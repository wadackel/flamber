import React, { PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import bem from "../../../../helpers/bem";
import ImageLoader from "../ImageLoader";

export default class CardMedia extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    baseClassName: PropTypes.string,
    image: PropTypes.string,
    overlay: PropTypes.element,
    selected: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  render() {
    const {
      children,
      baseClassName,
      style,
      overlay,
      image,
      selected
    } = this.props;

    const b = bem(`${baseClassName.trim()}__media`);
    const modifier = { selected };

    return (
      <div
        className={b(modifier)}
        style={style}
      >
        {overlay && <div className={b("overlay", modifier)}>{overlay}</div>}
        <div className={b("item-wrapper", modifier)}>
          <ImageLoader
            className={b("item", modifier)}
            src={image}
            background={true}
            preloader={<MDSpinner className={b("spinner")} />}
          />
        </div>
        {children}
      </div>
    );
  }
}
