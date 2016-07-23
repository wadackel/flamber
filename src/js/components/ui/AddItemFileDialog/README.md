Basic:

```
class AddItemFileDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <AddItemFileDialog
          open={this.state.open}
          selectBoards={[
            { name: "BOARD 1", value: 1 },
            { name: "BOARD 2", value: 2 },
            { name: "BOARD 3", value: 3 }
          ]}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

<AddItemFileDialogExample />
```
