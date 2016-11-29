Basic:

```
class CollapseExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div style={{ width: 300, margin: "auto" }}>
        <RaisedButton onClick={() => this.setState({ open: !this.state.open })}>Toggle</RaisedButton>

        <div style={{ margin: "0 0 20px" }} />

        <Collapse
          label="Options"
          open={this.state.open}
          onToggle={() => this.setState({ open: !this.state.open })}
        >
          <p>Paragraph...</p>
          <p>Paragraph...</p>
          <p>Paragraph...</p>
        </Collapse>
      </div>
    );
  }
}

<CollapseExample />
```
