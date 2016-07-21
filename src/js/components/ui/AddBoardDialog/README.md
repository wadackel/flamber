Basic:

```
class AddBoardDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      processing: false
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(value) {
    if (this.props.processing) return;
    this.setState({
      processing: true
    });
    setTimeout(() => {
      this.setState({
        processing: false,
        open: false
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <RaisedButton onClick={() => this.setState({ open: true })}>Open</RaisedButton>
        <AddBoardDialog
          processing={this.state.processing}
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          onRequestAdd={this.handleAdd}
        />
      </div>
    );
  }
}

<AddBoardDialogExample />
```
