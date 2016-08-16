Basic:

```
class ProcessingOverlayExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300
        }}
      >
        <ProcessingOverlay show={this.state.show} />
        <RaisedButton onClick={this.handleClick}>Show</RaisedButton>
      </div>
    );
  }
}

<ProcessingOverlayExample />
```
