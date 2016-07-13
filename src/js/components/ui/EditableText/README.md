Basic:

```
class EditableTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Default value" };
  }

  render() {
    return (
      <div>
        <EditableText
          icon={<PencilIcon />}
          value={this.state.value}
          onChange={(e, value) => this.setState({ value: value })}
        />
      </div>
    );
  }
}

<EditableTextExample />
```
