import React, { PropTypes } from "react";
import MDSpinner from "react-md-spinner";
import bem from "../../../../helpers/bem";
import bindHandlers from "../../../../helpers/bind-handlers";
import ImageLoader from "../ImageLoader";

export default class CardMedia extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    baseClassName: PropTypes.string,
    image: PropTypes.string,
    overlay: PropTypes.element
  };

  constructor(props) {
    super(props);

    this.state = { overlayShow: false };

    bindHandlers([
      "handleMouseEnter",
      "handleMouseLeave"
    ], this);
  }

  handleMouseEnter() {
    this.setState({ overlayShow: true });
  }

  handleMouseLeave() {
    this.setState({ overlayShow: false });
  }

  render() {
    const {
      children,
      baseClassName,
      style,
      overlay,
      image
    } = this.props;

    const { overlayShow } = this.state;

    const b = bem(`${baseClassName.trim()}__media`);

    const modifier = {
      "overlay-show": overlayShow
    };

    return (
      <div
        className={b(modifier)}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <MDSpinner className={b("spinner")} />
        {overlay && <div className={b("overlay", modifier)}>{overlay}</div>}
        <ImageLoader
          className={b("item", modifier)}
          src={image}
          background={true}
          preloader={<MDSpinner className={b("spinner")} />}
        />
        {children}
      </div>
    );
  }
}
