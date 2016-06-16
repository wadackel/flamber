Basic:

```
class DropDownMenuExample extends React.Component {
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
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} text="Item value 1" />
          <MenuItem value={2} text="Item value 2" />
          <MenuItem value={3} text="Item value 3" />
          <MenuItem value={4} text="Item value 4" />
          <MenuItem value={5} text="Item value 5" />
        </DropDownMenu>
      </div>
    );
  }
}

<DropDownMenuExample />
```
