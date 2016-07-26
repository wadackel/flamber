Basic:

```
class AlertDialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, processing: false };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ processing: true });
    setTimeout(() => {
      this.setState({
        open: false,
        processing: false
      });
    }, 1500);
  }

  render() {
    return (
      <div>
        <FlatButton onClick={() => this.setState({ open: true })}>Open</FlatButton>
        <AlertDialog
          open={this.state.open}
          processing={this.state.processing}
          title="Synchronization error"
          actions={[
            <FlatButton type="primary" onClick={this.handleClose}>OK</FlatButton>
          ]}
        >
          ストレージとの同期中にエラーが発生しました。ブラウザの再読み込みを実施してください。
        </AlertDialog>
      </div>
    )
  }
}

<AlertDialogExample />
```
