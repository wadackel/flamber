import React, { PropTypes } from "react";
import Prefixer from "inline-style-prefixer";
import * as OriginalPropTypes from "../../../constants/prop-types";
import bem from "../../../helpers/bem";
import mergeClassNames from "../../../helpers/merge-class-names";

const prefixer = new Prefixer();

export default class PopoverAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    baseClassName: PropTypes.string,
    open: PropTypes.bool,
    origin: OriginalPropTypes.origin
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.setState({ open: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });
  }

  render() {
    const {
      children,
      className,
      baseClassName,
      origin
    } = this.props;

    const b = bem(baseClassName);
    const modifier = { open: this.state.open };

    const originVertical = origin.vertical === "middle" ? "50%" : origin.vertical;
    const originHorizontal = origin.horizontal === "center" ? "50%" : origin.horizontal;
    const transformOrigin = `${originHorizontal} ${originVertical}`;
    const style = prefixer.prefix({ transformOrigin });

    return (
      <div
        className={mergeClassNames(b(modifier), className)}
        style={style}
      >
        <div
          className={b("horizontal", modifier)}
          style={style}
        >
          <div
            className={b("vertical", modifier)}
            style={style}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
