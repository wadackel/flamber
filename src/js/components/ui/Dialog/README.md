Basic:

```
class DialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <RaisedButton type="default" onClick={() => { this.setState({ open: true }) }}>Open</RaisedButton>
        <Dialog
          width={400}
          title="Add board"
          titleIcon={<BoardIcon />}
          actions={[
            <FlatButton type="primary">OK</FlatButton>,
            <FlatButton type="primary">Cancel</FlatButton>
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
