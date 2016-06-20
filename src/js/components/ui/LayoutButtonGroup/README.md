Basic:

```
class LayoutButtonGroupExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: "grid" };
  }

  render() {
    return (
      <div>
        <div>
        </div>
        <LayoutButtonGroup
          value={this.state.layout}
          onChange={layout => this.setState({ layout })}
        >
          <LayoutButton icon={<RandomGridIcon />} value="random-grid" />
          <LayoutButton icon={<GridIcon />} value="grid" />
          <LayoutButton icon={<ListIcon />} value="list" />
        </LayoutButtonGroup>
      </div>
    );
  }
}

<LayoutButtonGroupExample />
```
