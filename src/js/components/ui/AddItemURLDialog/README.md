Basic:

```
class AddItemURLDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      processing: false
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(url, selectBoard) {
    console.log(url, selectBoard);
    this.setState({ processing: true });

    setTimeout(() => {
      this.setState({ processing: false, open: false });
    }, 1000);
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <AddItemURLDialog
          open={this.state.open}
          processing={this.state.processing}
          selectBoards={[
            { name: "BOARD 1", value: 1 },
            { name: "BOARD 2", value: 2 },
            { name: "BOARD 3", value: 3 }
          ]}
          onRequestAdd={this.handleAdd}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

<AddItemURLDialogExample />
```
