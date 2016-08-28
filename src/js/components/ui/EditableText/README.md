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
          placeholder="Type text"
          value={this.state.value}
          onChange={(e, value) => this.setState({ value: value })}
          onEnter={(e, value) => this.setState({ displayValue: value })}
        />

        <div>displayValue: {this.state.displayValue}</div>
      </div>
    );
  }
}

<EditableTextExample />
```


Multi Line:

```
class EditableTextMultiLineExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Default value" };
  }


  render() {
    return <EditableText
      multiLine
      icon={<PencilIcon />}
      value={this.state.value}
      onChange={(e, value) => this.setState({ value })}
    />;
  }
}

<EditableTextMultiLineExample />
```
