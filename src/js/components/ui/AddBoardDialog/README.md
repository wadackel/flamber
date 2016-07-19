Basic:

```
class AddBoardDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <AddBoardDialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          onRequestAdd={value => console.log(`Add => ${value}`)}
        />
      </div>
    );
  }
}

<AddBoardDialogExample />
```
