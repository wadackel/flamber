Basic:

```
class ProcessingOverlayExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, hasText: false };
    this.handleClick = this.handleClick = this.handleClick.bind(this);
    this.handleTextToggle = this.handleTextToggle = this.handleTextToggle.bind(this);
  }

  handleClick() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  handleTextToggle() {
    this.setState({ hasText: !this.state.hasText });
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
        <ProcessingOverlay show={this.state.show}>
          {this.state.hasText ? "Loading..." : null}
        </ProcessingOverlay>
        <RaisedButton onClick={this.handleClick}>Show</RaisedButton>
        {" "}
        <Checkbox
          inline
          label="Show text"
          checked={this.state.hasText}
          onClick={this.handleTextToggle}
        />
      </div>
    );
  }
}

<ProcessingOverlayExample />
```
