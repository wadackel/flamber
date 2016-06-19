Basic:

```
class SnackbarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <Snackbar
          open={this.state.open}
          message="Snackbar Example"
          action="Undo"
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  };
}

<SnackbarExample />
```
