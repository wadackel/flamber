import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { signOutRequest } from "../actions/auth";

class SignOutContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object
  };

  componentDidMount() {
    if (!this.props.auth.isFetching) {
      this.props.dispatch(signOutRequest());
    }
  }

  render() {
    return null;
  }
}

export default connect(state => ({
  auth: state.auth
}))(SignOutContainer);
