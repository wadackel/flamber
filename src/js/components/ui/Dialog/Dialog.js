import React, { PropTypes } from "react";
import bem from "../../../helpers/bem";
// import bindHandlers from "../../../helpers/bind-handlers";
import { IconButton } from "../";
import CloseIcon from "../../svg-icons/CloseIcon";

const b = bem("dialog");

export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleIcon: PropTypes.element,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    width: 450,
    open: false,
    onRequestClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderHeader() {
    const {
      title,
      titleIcon
    } = this.props;

    if (!title) return null;

    const titleIconElement = titleIcon ? <span className={b("icon")}>{titleIcon}</span> : null;

    return (
      <div className={b("header")}>
        <h3 className={b("title")}>{titleIconElement}{title}</h3>
        <IconButton className={b("close")} icon={<CloseIcon />} />
      </div>
    );
  }

  // TODO:
  renderFooter() {
    return (
      <div></div>
    );
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className={b()}>
        {this.renderHeader()}
        {children}
        {this.renderFooter()}
      </div>
    );
  }
}
