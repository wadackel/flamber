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
          <ListItem primary="List Item 1" />
          <ListItem primary="List Item 2" />
          <ListItem primary="List Item 3" />
        </List>
        <div style={{ marginBottom: 20 }} />

        <List>
          {this.state.values.map((value, index) =>
            <ListItem
              key={index}
              primary={value}
              editable
              placeolder="Type item name"
              onComplete={this.handleComplete}
              onChange={(listItem, val, index) => console.log(listItem, val, index)}
              onRequestDelete={this.handleDelete}
            />
          )}
        </List>
        <div style={{ marginBottom: 20 }} />

        <List>
          <ListItem icon={<StarIcon />} primary="List Item 1" />
          <ListItem primary="List Item 2" />
          <ListItem icon={<FolderIcon />} primary="List Item 3" />
        </List>
        <div style={{ marginBottom: 20 }} />

        <List>
          <ListItem clickable={false} primary="List Item 1" secondary="secondary text" />
          <ListItem clickable={false} primary="List Item 2" secondary="secondary text" />
          <ListItem clickable={false} primary="List Item 3" secondary="secondary text" />
        </List>
      </div>
    );
  }
}

<ListExample />
```
