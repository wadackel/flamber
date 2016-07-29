Basic:

```
class SelectBoardDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      processing: false,
      value: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(value) {
    this.setState({ processing: true });

    setTimeout(() => {
      this.setState({ open: false, processing: false, value });
    }, 1000);
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <SelectBoardDialog
          open={this.state.open}
          processing={this.state.processing}
          boards={[
            { name: "ボード1", value: 1 },
            { name: "ボード2", value: 2 },
            { name: "ボード3", value: 3 }
          ]}
          defaultValue={this.state.value}
          onSelect={this.handleSelect}
          onRequestClose={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

<SelectBoardDialogExample />
```
