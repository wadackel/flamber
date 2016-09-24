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
        <DropDownMenu
          before={<Checkbox onClick={e => e.stopPropagation()} />}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primary="Item value 1" />
          <MenuItem value={2} primary="Item value 2" />
          <MenuItem value={3} primary="Item value 3" />
          <MenuItem value={4} primary="Item value 4" />
          <MenuItem value={5} primary="Item value 5" />
        </DropDownMenu>
      </div>
    );
  }
}

<DropDownMenuExample />
```


Long values:

```
class DropDownMenuLongExample extends React.Component {
  constructor(props) {
    super(props);
    const values = [];
    for (let i = 0; i < 50; i++) {
      values.push(<MenuItem key={i} value={i} primary={`Item value ${i}`} />);
    }
    this.state = { value: 1, values };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {this.state.values}
        </DropDownMenu>
      </div>
    );
  }
}

<DropDownMenuLongExample />
```
