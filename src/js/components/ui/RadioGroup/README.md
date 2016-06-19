Basic:

```
class RadioGroupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <RadioGroup
        value={this.state.value}
        name="radiotest"
        onChange={this.handleChange}
      >
        <Radio value={1} label="Radio Item 1" />
        <Radio value={2} label="Radio Item 2" />
        <Radio value={3} label="Radio Item 3" />
      </RadioGroup>
    );
  }
}

<RadioGroupExample />
```
