Basic:

```
<div>
  <ColorBar
    palette={["#1da6d4", "#fffc00", "#ffffff"]}
  />
</div>
```


Selectable:

```
class ColorBarSelectableExample extends React.Component {
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
          selectable
          color={this.state.color}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

<ColorBarSelectableExample />
```
