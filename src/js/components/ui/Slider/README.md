Basic:

```
class SliderExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 50 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return <Slider
      value={this.state.value}
      defaultValue={50}
      onChange={this.handleChange}
    />;
  }
}

<SliderExample />
```
