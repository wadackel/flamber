Basic:

```
class CheckboxGroupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [1] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <CheckboxGroup
        value={this.state.value}
        name="checkboxtest"
        onChange={this.handleChange}
      >
        <Checkbox value={1} label="Check Item 1" />
        <Checkbox value={2} label="Check Item 2" />
        <Checkbox value={3} label="Check Item 3" />
      </CheckboxGroup>
    );
  }
}

<CheckboxGroupExample />
```
