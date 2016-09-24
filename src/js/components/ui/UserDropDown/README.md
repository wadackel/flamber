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

  render() {
    return (
      <div>
        <Avatar
          primary="wadackel"
          secondary="Sign in from Google"
          icon="/images/avatar-sample.png"
          onIconClick={this.handleIconClick}
        />
        <UserDropDown
          open={this.state.open}
          triggerElement={this.state.triggerElement}
          limit={200}
          usage={126}
          onRequestClose={this.handleRequestClose}
          onRequestOptions={() => console.log("OPTIONS")}
          onRequestSignOut={() => console.log("SIGN_OUT")}
        />
      </div>
    );
  }
}

<UserDropDownExample />
```
