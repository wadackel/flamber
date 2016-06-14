Basic:

```
class PopoverExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <FlatButton onClick={() => this.setState({ open: true })}>Open</FlatButton>
        <Popover
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
        >
          <Menu>
            <MenuItem text="Item 1" />
            <MenuItem text="Item 2" />
            <MenuItem text="Item 3" />
            <MenuItem text="Item 4" />
            <MenuItem text="Item 5" />
          </Menu>
        </Popover>
      </div>
    );
  }
}
```
