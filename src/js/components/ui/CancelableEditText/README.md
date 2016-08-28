Basic:

```
class CancelableEditTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Default value" };
  }

  render() {
    return (
      <div>
        <CancelableEditText
          icon={<PencilIcon />}
          value={this.state.value}
          onComplete={value => this.setState({ value })}
        />
        <div style={{ marginBottom: 20 }} />
        <div>Result: {this.state.value}</div>
      </div>
    );
  }
}

<CancelableEditTextExample />
```
