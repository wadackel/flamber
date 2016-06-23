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
        <Drawer
          open={this.state.open}
          footer={
            <div style={{
              padding: "30px 40px",
              background: "#000",
              textAlign: "center"
            }}>Footer</div>
          }
        >
          <List>
            <ListItem text="Item 1" editable={true} />
            <ListItem text="Item 2" editable={true} />
            <ListItem text="Item 3" editable={true} />
            <ListItem text="Item 4" editable={true} />
            <ListItem text="Item 5" editable={true} />
            <ListItem text="Item 6" editable={true} />
            <ListItem text="Item 7" editable={true} />
            <ListItem text="Item 8" editable={true} />
            <ListItem text="Item 9" editable={true} />
            <ListItem text="Item 10" editable={true} />
            <ListItem text="Item 11" editable={true} />
            <ListItem text="Item 12" editable={true} />
            <ListItem text="Item 13" editable={true} />
            <ListItem text="Item 14" editable={true} />
            <ListItem text="Item 15" editable={true} />
          </List>
        </Drawer>
      </div>
    );
  }
}

<DrawerExample />
```
