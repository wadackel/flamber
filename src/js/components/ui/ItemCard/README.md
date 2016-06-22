Basic:

```
class ItemCardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <ItemCard
        style={{ width: 270 }}
        selected={this.state.selected}
        url="http://example.com/path/to/"
        title="Dripup Creative Design Pallete"
        image="/images/card-sample.png"
        colors={["#2D8A35", "#161815", "#4361A6"]}
        onSelect={() => this.setState({ selected: !this.state.selected })}
      />
    );
  }
}

<ItemCardExample />
```
