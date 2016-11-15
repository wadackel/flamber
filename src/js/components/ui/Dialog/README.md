Basic:

```
class DialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, processing: false };
    this.handleOk = this.handleOk.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOk() {
    this.setState({ processing: true });
    setTimeout(() => {
      this.setState({ open: false, processing: false });
    }, 1000);
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <RaisedButton type="default" onClick={() => { this.setState({ open: true }) }}>Open</RaisedButton>
        <Dialog
          processing={this.state.processing ? "Processing..." : ""}
          width={400}
          title="Add board"
          titleIcon={<BoardIcon />}
          actions={[
            <FlatButton type="primary" onClick={this.handleOk}>OK</FlatButton>,
            <FlatButton type="primary" onClick={this.handleClose}>Cancel</FlatButton>
          ]}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </Dialog>
      </div>
    );
  }
}

<DialogExample />
```
