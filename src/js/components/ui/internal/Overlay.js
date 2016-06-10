import React, { PropTypes } from "react";

export default class Overlay extends React.Component {
  static propTypes = {
    open: PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  render() {
    return (
      <div>Overlay: TODO</div>
    );
  }
}
