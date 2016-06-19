Basic:

```
class ColorBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(color) {
    this.setState({ color });
  }

  render() {
    return (
      <div>
        <ColorBar
          color={this.state.color}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

<ColorBarExample />
```
