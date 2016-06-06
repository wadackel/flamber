import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Landing extends React.Component {
  renderUser() {
    const { user } = this.props.auth;
    if (!user) return null;

    return (
      <dl>
        <dt>Photo</dt>
        <dd><img src={user.photoLink} /></dd>
        <dt>Display name</dt>
        <dd>{user.displayName}</dd>
        <dt>Email</dt>
        <dd>{user.emailAddress}</dd>
      </dl>
    );
  }

  render() {
    return (
      <div>
        {this.renderUser()}
        <Link to="/signin">SignIn</Link><br />
        <Link to="/signout">SignOut</Link><br />
        <Link to="/user">User only</Link>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth })
)(Landing);
