Basic:

```
class EditableTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Default value",
      displayValue: ""
    };
  }

  render() {
    return (
      <div>
        <EditableText
          icon={<PencilIcon />}
          value={this.state.value}
          onChange={(e, value) => this.setState({ value: value })}
          onComplete={value => this.setState({ displayValue: value })}
        />

        <div>displayValue: {this.state.displayValue}</div>
      </div>
    );
  }
}

<EditableTextExample />
```
