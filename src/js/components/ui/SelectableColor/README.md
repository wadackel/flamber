Basic:

```
class SelectableColorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <div>
        <SelectableColor
          color="#1da6d4"
          selected={this.state.selected}
          onClick={(e, color) => this.setState({ selected: !this.state.selected })}
        />
      </div>
    );
  }
}

<SelectableColorExample />
```
