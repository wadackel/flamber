Basic:

```
class UserDropDownExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      triggerElement: null
    };
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleIconClick(e) {
    this.setState({
      open: !this.state.open,
      triggerElement: e.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleSignOut() {
    console.log("SIGN_OUT");
  }

  render() {
    return (
      <div>
        <Avatar
          name="wadackel"
          email="mail@example.com"
          icon="/images/avatar-sample.png"
          onIconClick={this.handleIconClick}
        />
        <UserDropDown
          open={this.state.open}
          triggerElement={this.state.triggerElement}
          limit={16106127360}
          usage={2195751968}
          onRequestClose={this.handleRequestClose}
          onRequestSignOut={this.handleSignOut}
        />
      </div>
    );
  }
}

<UserDropDownExample />
```
