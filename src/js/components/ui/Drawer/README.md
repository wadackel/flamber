Basic:

```
class DrawerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <FlatButton label="Toggle" onClick={() => this.setState({ open: !this.state.open })} />
        <Drawer open={this.state.open}>
          <List>
            <ListItem text="Item 1" />
            <ListItem text="Item 2" />
            <ListItem text="Item 3" />
          </List>
        </Drawer>
      </div>
    );
  }
}

<DrawerExample />
```
