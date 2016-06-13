Basic:

```
class ListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ["List Item 1", "List Item 2", "List Item 3"]
    };
    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleComplete(listItem, val, index) {
    const values = this.state.values.slice();
    console.log(val, "==================");
    values[index] = val;
    this.setState({ values });
  }

  handleDelete(listItem, index) {
    const values = this.state.values.filter((val, i) => i !== index);
    this.setState({ values });
  }

  render() {
    return (
      <div>
        <List>
          <ListItem text="List Item 1" />
          <ListItem text="List Item 2" />
          <ListItem text="List Item 3" />
        </List>
        <div style={{ marginBottom: 20 }} />
        <List>
          {this.state.values.map(value =>
            <ListItem
              text={value}
              editable
              placeolder="Type item name"
              onComplete={this.handleComplete}
              onChange={(listItem, val, index) => console.log(listItem, val, index)}
              onRequestDelete={this.handleDelete}
            />
          )}
        </List>
      </div>
    );
  }
}

<ListExample />
```
